"""
parse_pyq_to_json.py
Parses LDC_2026_Master_Question_Bank.docx and produces 4 validated JSON files.

Output:
  public/assessment-bank/government/ldc/ldc-2026-set-1.json  (Q00001-Q00050)
  public/assessment-bank/government/ldc/ldc-2026-set-2.json  (Q00051-Q00100)
  public/assessment-bank/government/ldc/ldc-2026-set-3.json  (Q00101-Q00150)
  public/assessment-bank/government/ldc/ldc-2026-set-4.json  (Q00151-Q00200)
"""

import docx
import io
import re
import json
import os
import sys
from pathlib import Path

# ─── Configuration ────────────────────────────────────────────────────────────
DOCX_PATH   = r'C:\Users\acer\Desktop\LDC_2026_Master_Question_Bank.docx'
OUTPUT_DIR  = Path(r'public/assessment-bank/government/ldc')
QUESTIONS_PER_SET = 50
TOTAL_EXPECTED    = 200
SETS = [
    { "id": "set-1", "file": "ldc-2026-set-1.json", "start": 1,   "end": 50  },
    { "id": "set-2", "file": "ldc-2026-set-2.json", "start": 51,  "end": 100 },
    { "id": "set-3", "file": "ldc-2026-set-3.json", "start": 101, "end": 150 },
    { "id": "set-4", "file": "ldc-2026-set-4.json", "start": 151, "end": 200 },
]

# Required schema fields for every question
REQUIRED_FIELDS = ['id', 'category', 'topic', 'subtopic', 'difficulty',
                   'estimated_time', 'question', 'options', 'exam_tags', 'status']


# ─── Step 1: Parse Document ───────────────────────────────────────────────────
def parse_docx(path):
    doc   = docx.Document(path)
    lines = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

    questions = []
    current   = {}
    options   = []

    i = 0
    while i < len(lines):
        line = lines[i]

        # ── New question block ──
        if re.match(r'^Q\d{5}$', line):
            if current:
                current['options'] = options
                questions.append(current)
            current = {'id': line}
            options = []

        elif line.startswith('Category:'):
            current['category'] = line.split(':', 1)[1].strip()

        elif line.startswith('Topic:'):
            current['topic'] = line.split(':', 1)[1].strip()

        elif line.startswith('Subtopic:'):
            current['subtopic'] = line.split(':', 1)[1].strip()

        elif line.startswith('Difficulty:'):
            current['difficulty'] = line.split(':', 1)[1].strip().lower()

        elif line.startswith('Estimated Time:'):
            raw = line.split(':', 1)[1].strip()
            # Extract seconds as integer
            seconds = int(re.search(r'\d+', raw).group()) if re.search(r'\d+', raw) else 0
            current['estimated_time'] = seconds

        elif line.startswith('Question:'):
            q_parts = []
            i += 1
            while i < len(lines) and not lines[i].startswith('Options:'):
                q_parts.append(lines[i])
                i += 1
            current['question'] = '\n'.join(q_parts).strip()
            continue  # i already positioned at 'Options:'

        elif line.startswith('Options:'):
            i += 1
            while i < len(lines) and re.match(r'^[A-D]\.', lines[i]):
                options.append({
                    "label": lines[i][0],
                    "text":  lines[i].split('.', 1)[1].strip()
                })
                i += 1
            continue

        elif line.startswith('Correct Answer:'):
            val = line.split(':', 1)[1].strip()
            current['correct_answer'] = None if val.lower() == 'not available' else val

        elif line.startswith('Exam Tags:'):
            current['exam_tags'] = [t.strip() for t in line.split(':', 1)[1].strip().split(',') if t.strip()]

        elif line.startswith('Verification Status:'):
            current['verification_status'] = line.split(':', 1)[1].strip()

        elif line.startswith('Status:'):
            current['status'] = line.split(':', 1)[1].strip().lower()

        i += 1

    # Flush last question
    if current:
        current['options'] = options
        questions.append(current)

    return questions


# ─── Step 2: Validate All Questions ──────────────────────────────────────────
def validate(questions):
    errors   = []
    warnings = []

    seen_ids    = {}
    seen_texts  = {}

    for idx, q in enumerate(questions):
        qid = q.get('id', f'[index {idx}]')

        # Required fields
        for field in REQUIRED_FIELDS:
            val = q.get(field)
            if val is None or val == '' or val == []:
                errors.append(f"{qid}: Missing required field '{field}'")

        # Exactly 4 options
        opts = q.get('options', [])
        if len(opts) != 4:
            errors.append(f"{qid}: Expected 4 options, got {len(opts)}")

        # Option labels A-D
        for o in opts:
            if not o.get('text', '').strip():
                errors.append(f"{qid}: Option '{o.get('label')}' text is empty")

        # Duplicate IDs
        if qid in seen_ids:
            errors.append(f"{qid}: Duplicate Question ID (first at index {seen_ids[qid]})")
        else:
            seen_ids[qid] = idx

        # Duplicate question texts
        qtext = q.get('question', '').strip().lower()
        if qtext and qtext in seen_texts:
            errors.append(f"{qid}: Duplicate question text (same as {seen_texts[qtext]})")
        elif qtext:
            seen_texts[qtext] = qid

        # Correct answer – warn only if not set (allowed)
        if q.get('correct_answer') is None:
            warnings.append(f"{qid}: correct_answer is 'Not Available'")

    # Total count
    if len(questions) != TOTAL_EXPECTED:
        errors.append(f"Total question count is {len(questions)}, expected {TOTAL_EXPECTED}")

    return errors, warnings


# ─── Step 3: Slice & Write ───────────────────────────────────────────────────
def write_sets(questions):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for s in SETS:
        chunk = questions[s['start'] - 1 : s['end']]
        if len(chunk) != QUESTIONS_PER_SET:
            print(f"ERROR: {s['file']} would have {len(chunk)} questions (expected {QUESTIONS_PER_SET}). Aborting.")
            sys.exit(1)

        out_path = OUTPUT_DIR / s['file']
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(chunk, f, indent=2, ensure_ascii=False)

        print(f"  ✓ Written {out_path}  ({len(chunk)} questions)")


# --- Main ---------------------------------------------------------------------
def main():
    print("=" * 60)
    print("  PYQ Parser -> LDC 2026 Question Bank")
    print("=" * 60)

    print(f"\n[1/3] Parsing document: {DOCX_PATH}")
    questions = parse_docx(DOCX_PATH)
    print(f"       Parsed {len(questions)} questions.")

    print(f"\n[2/3] Validating...")
    errors, warnings = validate(questions)

    if warnings:
        print(f"\n  ⚠ Warnings ({len(warnings)}):")
        for w in warnings:
            print(f"    • {w}")

    if errors:
        print(f"\n  ✗ VALIDATION FAILED — {len(errors)} error(s):")
        for e in errors:
            print(f"    ✗ {e}")
        print("\n  Aborting. No JSON files were written.")
        sys.exit(1)

    print(f"  ✓ All {len(questions)} questions passed validation!")

    print(f"\n[3/3] Writing JSON files to '{OUTPUT_DIR}' ...")
    write_sets(questions)

    print(f"\n{'=' * 60}")
    print(f"  ✓ DONE — 4 JSON files written ({TOTAL_EXPECTED} questions total)")
    print(f"{'=' * 60}\n")


if __name__ == '__main__':
    main()
