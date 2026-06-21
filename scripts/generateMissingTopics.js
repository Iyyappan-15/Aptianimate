import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { CAMPUS_PLACEMENT_SYLLABUS } from '../src/data/campusPlacementSyllabus.js';
import { TOPIC_CONTENT, topicToSlug } from '../src/data/topicContent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allTopics = CAMPUS_PLACEMENT_SYLLABUS.flatMap(s => 
  s.subcategories.flatMap(sc => 
    sc.topics.map(t => ({ name: t, section: s.section, color: s.color, icon: s.icon }))
  )
);

const missing = allTopics.filter(t => !TOPIC_CONTENT[topicToSlug(t.name)]);

if (missing.length === 0) {
  console.log("No missing topics found.");
  process.exit(0);
}

let newContent = `\n\n  // ════════════════════════════════════════\n  //  AUTO-GENERATED TOPICS\n  // ════════════════════════════════════════\n\n`;

missing.forEach(topic => {
  const slug = topicToSlug(topic.name);
  newContent += `  '${slug}': {
    title: '${topic.name}',
    icon: '${topic.icon}',
    color: '${topic.color}',
    tagline: 'Master the concepts of ${topic.name}.',
    description: \`This section covers the core concepts, common question patterns, and fast-solving techniques for ${topic.name}. Understanding this topic is crucial for maximizing your score in the ${topic.section} section.\`,
    keyFacts: [
      { label: 'Basic Concept', value: 'Understand the fundamental definitions and rules.' },
      { label: 'Common Trap', value: 'Watch out for units or wording designed to confuse you.' },
    ],
    formulas: [
      { title: 'Standard Formula', formula: 'Result = (Given Data) × Concept', example: 'Apply the formula directly to the given numbers.' },
    ],
    identify: [
      'Look for keywords specific to ${topic.name}.',
      'Identify the given values and what needs to be found.',
    ],
    approach: [
      { step: '1', tip: 'Read the question carefully and note down the given data.' },
      { step: '2', tip: 'Recall the relevant formula or shortcut method.' },
      { step: '3', tip: 'Perform the calculation, ensuring units are consistent.' },
      { step: '4', tip: 'Verify if the answer makes logical sense.' },
    ],
  },\n\n`;
});

const filePath = path.join(__dirname, '../src/data/topicContent.js');
let fileContent = fs.readFileSync(filePath, 'utf8');

// Insert before the last closing brace
const insertPos = fileContent.lastIndexOf('};');
fileContent = fileContent.substring(0, insertPos) + newContent + fileContent.substring(insertPos);

fs.writeFileSync(filePath, fileContent);
console.log(`Successfully generated content for ${missing.length} missing topics.`);
