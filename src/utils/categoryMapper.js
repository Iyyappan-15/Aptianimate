// src/utils/categoryMapper.js
// Maps every topicSlug → its folder path under /public/data/
// The slug MUST exactly match the filename of the .json file.

export function getTopicCategoryPath(topicSlug) {
  const map = {
    // ── Quantitative Aptitude / Number Systems ──────────────────────────
    'number-system-basics':     'quantitative-aptitude/number-systems',
    'lcm-hcf':                  'quantitative-aptitude/number-systems',
    'divisibility-rules':       'quantitative-aptitude/number-systems',
    'prime-factorization':      'quantitative-aptitude/number-systems',
    'number-of-factors':        'quantitative-aptitude/number-systems',
    'remainders':               'quantitative-aptitude/number-systems',
    'unit-digits-cyclicity':    'quantitative-aptitude/number-systems',
    'decimal-fractions':        'quantitative-aptitude/number-systems',
    'simplification':           'quantitative-aptitude/number-systems',
    'approximation':            'quantitative-aptitude/number-systems',
    'trailing-zeros':           'quantitative-aptitude/number-systems',

    // ── Quantitative Aptitude / Arithmetic ──────────────────────────────
    'percentages':              'quantitative-aptitude/arithmetic',
    'averages':                 'quantitative-aptitude/arithmetic',
    'simple-interest':          'quantitative-aptitude/arithmetic',
    'compound-interest':        'quantitative-aptitude/arithmetic',
    'ages':                     'quantitative-aptitude/arithmetic',
    'profit-loss':              'quantitative-aptitude/arithmetic',       // file: profit-loss.json
    'profit-and-loss':          'quantitative-aptitude/arithmetic',       // alias
    'ratio-proportion':         'quantitative-aptitude/arithmetic',       // file: ratio-proportion.json
    'ratio-and-proportion':     'quantitative-aptitude/arithmetic',       // alias
    'alligation-mixtures':      'quantitative-aptitude/arithmetic',       // file: alligation-mixtures.json
    'alligation-and-mixtures':  'quantitative-aptitude/arithmetic',       // alias

    // ── Quantitative Aptitude / Work & Motion ───────────────────────────
    'time-work':                'quantitative-aptitude/work-and-motion',  // file: time-work.json
    'time-and-work':            'quantitative-aptitude/work-and-motion',  // alias
    'pipes-cisterns':           'quantitative-aptitude/work-and-motion',  // file: pipes-cisterns.json
    'pipes-and-cisterns':       'quantitative-aptitude/work-and-motion',  // alias
    'time-speed-distance':      'quantitative-aptitude/work-and-motion',
    'trains':                   'quantitative-aptitude/work-and-motion',
    'boats-streams':            'quantitative-aptitude/work-and-motion',  // file: boats-streams.json
    'boats-and-streams':        'quantitative-aptitude/work-and-motion',  // alias

    // ── Quantitative Aptitude / Advanced ────────────────────────────────
    'probability':              'quantitative-aptitude/advanced-aptitude',
    'permutation-combination':  'quantitative-aptitude/advanced-aptitude',
    'logarithm':                'quantitative-aptitude/advanced-aptitude',

    // ── Quantitative Aptitude / Data Interpretation ─────────────────────
    'tables':                   'quantitative-aptitude/data-interpretation',
    'bar-charts':               'quantitative-aptitude/data-interpretation',
    'pie-charts':               'quantitative-aptitude/data-interpretation',
    'line-graphs':              'quantitative-aptitude/data-interpretation',
    'mixed-di-sets':            'quantitative-aptitude/data-interpretation',

    // ── Verbal Ability / Grammar & Usage ────────────────────────────────
    'error-spotting':           'verbal-ability/grammar-usage',
    'sentence-correction':      'verbal-ability/grammar-usage',
    'fill-in-the-blanks':       'verbal-ability/grammar-usage',
    'sentence-completion':      'verbal-ability/grammar-usage',
    'cloze-test':               'verbal-ability/grammar-usage',

    // ── Verbal Ability / Reading Comprehension ───────────────────────────
    'reading-comprehension':    'verbal-ability/reading-comprehension',
    'para-jumbles':             'verbal-ability/reading-comprehension',

    // ── Logical Reasoning / Series ──────────────────────────────────────
    'number-series':            'logical-reasoning/series',
    'letter-series':            'logical-reasoning/series',
    'alphanumeric-series':      'logical-reasoning/series',

    // ── Logical Reasoning / Logical Relations ───────────────────────────
    'coding-decoding':          'logical-reasoning/logical-relations',
    'blood-relations':          'logical-reasoning/logical-relations',
    'direction-sense':          'logical-reasoning/logical-relations',
    'ranking-ordering':         'logical-reasoning/logical-relations',

    // ── Logical Reasoning / Analytical Reasoning ────────────────────────
    'syllogism':                'logical-reasoning/analytical-reasoning',
    'statement-conclusion':     'logical-reasoning/analytical-reasoning',
    'statement-assumption':     'logical-reasoning/analytical-reasoning',
  };

  if (map[topicSlug]) return map[topicSlug];

  // Warn in dev so we can catch missing mappings quickly
  console.warn(`[categoryMapper] No mapping found for slug: "${topicSlug}". Falling back to miscellaneous.`);
  return 'quantitative-aptitude/miscellaneous';
}
