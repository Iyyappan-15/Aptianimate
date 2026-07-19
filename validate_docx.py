import docx
import re
import json

def parse_docx():
    doc = docx.Document(r'C:\Users\acer\Desktop\LDC_2026_Master_Question_Bank.docx')
    lines = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
    
    questions = []
    current_q = {}
    options = []
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        if re.match(r'^Q\d{5}$', line):
            if current_q:
                current_q['options'] = options
                questions.append(current_q)
            current_q = {'id': line}
            options = []
        elif line.startswith('Category:'):
            current_q['category'] = line.split(':', 1)[1].strip()
        elif line.startswith('Topic:'):
            current_q['topic'] = line.split(':', 1)[1].strip()
        elif line.startswith('Subtopic:'):
            current_q['subtopic'] = line.split(':', 1)[1].strip()
        elif line.startswith('Difficulty:'):
            current_q['difficulty'] = line.split(':', 1)[1].strip()
        elif line.startswith('Estimated Time:'):
            current_q['estimated_time'] = line.split(':', 1)[1].strip()
        elif line.startswith('Question:'):
            q_text = []
            i += 1
            while i < len(lines) and not lines[i].startswith('Options:'):
                q_text.append(lines[i])
                i += 1
            current_q['question'] = '\n'.join(q_text)
            continue # Already incremented i
        elif line.startswith('Options:'):
            i += 1
            while i < len(lines) and re.match(r'^[A-D]\.', lines[i]):
                options.append(lines[i].split('.', 1)[1].strip())
                i += 1
            continue # Already incremented i
        elif line.startswith('Correct Answer:'):
            current_q['correct_answer'] = line.split(':', 1)[1].strip()
        elif line.startswith('Exam Tags:'):
            current_q['exam_tags'] = [t.strip() for t in line.split(':', 1)[1].strip().split(',')]
        elif line.startswith('Verification Status:'):
            current_q['verification_status'] = line.split(':', 1)[1].strip()
        elif line.startswith('Status:'):
            current_q['status'] = line.split(':', 1)[1].strip()
            
        i += 1
        
    if current_q:
        current_q['options'] = options
        questions.append(current_q)
        
    return questions

def validate_questions(questions):
    errors = []
    required_fields = ['id', 'category', 'topic', 'subtopic', 'difficulty', 'estimated_time', 
                       'question', 'options', 'correct_answer', 'exam_tags', 'verification_status', 'status']
    
    for idx, q in enumerate(questions):
        missing = [f for f in required_fields if f not in q or not q[f]]
        if missing:
            errors.append(f"Question {q.get('id', idx)} is missing: {', '.join(missing)}")
            
        if 'options' in q and len(q['options']) != 4:
            errors.append(f"Question {q.get('id', idx)} does not have exactly 4 options. Found {len(q.get('options', []))}")
            
    return errors, len(questions)

questions = parse_docx()
errors, count = validate_questions(questions)

print(f"Total questions parsed: {count}")
if errors:
    print("VALIDATION ERRORS FOUND:")
    for e in errors[:50]:
        print(e)
    if len(errors) > 50:
        print(f"... and {len(errors) - 50} more errors.")
else:
    print("All questions validated successfully!")
