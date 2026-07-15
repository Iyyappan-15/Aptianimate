-- ==============================================================================
-- PHASE 2: SECURE GRADING ENGINE & MOCK TEST GENERATION (RPCs)
-- ==============================================================================

-- 1. Generate Mock Test Function
-- This securely fetches questions WITHOUT their answers.
-- It uses the random_seed index for sub-millisecond generation even with 100k+ questions.

CREATE OR REPLACE FUNCTION public.generate_mock_test(
  p_quant INT DEFAULT 20,
  p_logical INT DEFAULT 20,
  p_verbal INT DEFAULT 20,
  p_technical INT DEFAULT 0
) 
RETURNS JSON 
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with elevated privileges to bypass RLS for reading questions
AS $$
DECLARE
  v_rand_q FLOAT := random();
  v_rand_l FLOAT := random();
  v_rand_v FLOAT := random();
  v_rand_t FLOAT := random();
  v_result JSON;
BEGIN
  WITH quant_q AS (
    (SELECT id, category, topic, difficulty, question, options, estimated_time, company_tags 
     FROM public.assessment_questions 
     WHERE category = 'quantitative' AND status = 'published' AND random_seed >= v_rand_q 
     ORDER BY random_seed ASC LIMIT p_quant)
    UNION ALL
    (SELECT id, category, topic, difficulty, question, options, estimated_time, company_tags 
     FROM public.assessment_questions 
     WHERE category = 'quantitative' AND status = 'published' AND random_seed < v_rand_q 
     ORDER BY random_seed ASC LIMIT p_quant)
    LIMIT p_quant
  ),
  logical_q AS (
    (SELECT id, category, topic, difficulty, question, options, estimated_time, company_tags 
     FROM public.assessment_questions 
     WHERE category = 'logical' AND status = 'published' AND random_seed >= v_rand_l 
     ORDER BY random_seed ASC LIMIT p_logical)
    UNION ALL
    (SELECT id, category, topic, difficulty, question, options, estimated_time, company_tags 
     FROM public.assessment_questions 
     WHERE category = 'logical' AND status = 'published' AND random_seed < v_rand_l 
     ORDER BY random_seed ASC LIMIT p_logical)
    LIMIT p_logical
  ),
  verbal_q AS (
    (SELECT id, category, topic, difficulty, question, options, estimated_time, company_tags 
     FROM public.assessment_questions 
     WHERE category = 'verbal' AND status = 'published' AND random_seed >= v_rand_v 
     ORDER BY random_seed ASC LIMIT p_verbal)
    UNION ALL
    (SELECT id, category, topic, difficulty, question, options, estimated_time, company_tags 
     FROM public.assessment_questions 
     WHERE category = 'verbal' AND status = 'published' AND random_seed < v_rand_v 
     ORDER BY random_seed ASC LIMIT p_verbal)
    LIMIT p_verbal
  ),
  tech_q AS (
    (SELECT id, category, topic, difficulty, question, options, estimated_time, company_tags 
     FROM public.assessment_questions 
     WHERE category = 'technical' AND status = 'published' AND random_seed >= v_rand_t 
     ORDER BY random_seed ASC LIMIT p_technical)
    UNION ALL
    (SELECT id, category, topic, difficulty, question, options, estimated_time, company_tags 
     FROM public.assessment_questions 
     WHERE category = 'technical' AND status = 'published' AND random_seed < v_rand_t 
     ORDER BY random_seed ASC LIMIT p_technical)
    LIMIT p_technical
  ),
  combined AS (
    SELECT * FROM quant_q
    UNION ALL SELECT * FROM logical_q
    UNION ALL SELECT * FROM verbal_q
    UNION ALL SELECT * FROM tech_q
  )
  -- Convert combined results into a single JSON array
  SELECT COALESCE(json_agg(combined.*), '[]'::json) INTO v_result FROM combined;
  
  RETURN v_result;
END;
$$;


-- ==============================================================================
-- 2. Submit Mock Test Function
-- Validates answers securely on the server and computes the final score.
-- Takes a JSON array of objects: [{"question_id": "uuid", "selected_option": "A) 10"}]
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.submit_mock_test(
  p_test_id UUID,
  p_answers JSONB
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_correct_count INT := 0;
  v_incorrect_count INT := 0;
  v_unanswered_count INT := 0;
  v_total_score INT := 0;
  v_total_questions INT := 0;
  v_mock_test RECORD;
  v_answer RECORD;
  v_db_question RECORD;
  v_analytics JSONB;
  v_result JSON;
BEGIN
  -- 1. Ensure user is logged in
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- 2. Fetch the mock test
  SELECT * INTO v_mock_test FROM public.mock_tests WHERE id = p_test_id AND user_id = v_user_id AND status = 'in_progress';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Mock test not found or already completed';
  END IF;

  -- 3. Loop through submitted answers and validate
  -- (Assuming each correct answer is +4, incorrect is -1. Modify as needed.)
  FOR v_answer IN SELECT * FROM jsonb_to_recordset(p_answers) AS x(question_id UUID, selected_option TEXT)
  LOOP
    v_total_questions := v_total_questions + 1;
    
    -- Fetch the correct answer from the secure table
    SELECT correct_answer INTO v_db_question FROM public.assessment_questions WHERE id = v_answer.question_id;
    
    IF v_db_question IS NOT NULL THEN
      IF v_answer.selected_option IS NULL OR v_answer.selected_option = '' THEN
        v_unanswered_count := v_unanswered_count + 1;
      ELSIF v_answer.selected_option = v_db_question.correct_answer THEN
        v_correct_count := v_correct_count + 1;
        v_total_score := v_total_score + 4; -- Positive marking
      ELSE
        v_incorrect_count := v_incorrect_count + 1;
        v_total_score := v_total_score - 1; -- Negative marking
      END IF;
    END IF;
  END LOOP;

  -- 4. Calculate any additional analytics (stubbed for now)
  v_analytics := jsonb_build_object(
    'accuracy', CASE WHEN (v_correct_count + v_incorrect_count) > 0 THEN (v_correct_count::FLOAT / (v_correct_count + v_incorrect_count) * 100) ELSE 0 END,
    'total_attempted', (v_correct_count + v_incorrect_count)
  );

  -- 5. Update the mock test record
  UPDATE public.mock_tests
  SET 
    status = 'completed',
    end_time = NOW(),
    score = v_total_score,
    correct_count = v_correct_count,
    incorrect_count = v_incorrect_count,
    unanswered_count = v_unanswered_count,
    user_answers = p_answers,
    analytics = v_analytics
  WHERE id = p_test_id;

  -- 6. Return the results to the user
  v_result := json_build_object(
    'success', true,
    'score', v_total_score,
    'correct', v_correct_count,
    'incorrect', v_incorrect_count,
    'unanswered', v_unanswered_count,
    'analytics', v_analytics
  );

  RETURN v_result;
END;
$$;
