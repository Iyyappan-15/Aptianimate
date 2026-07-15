const fs = require('fs');
let content = fs.readFileSync('src/pages/TopicPage.jsx', 'utf8');

const replacements = {
  'ðŸ“š': '📚',
  'ðŸŽ¯': '🎯',
  'â€¢': '•',
  'â ±': '⏱',
  'ðŸ“Œ': '📌',
  'â†’': '→',
  'ðŸš€': '🚀',
  'âœ“': '✓',
  'â ±ï¸ ': '⏱️',
  'âˆš': '√',
  'â€”': '—',
  'â€œ': '“',
  'â€': '”',
  'â€˜': '‘',
  'â€™': '’',
  'Â±': '±',
  'â‰¤': '≤',
  'â‰¥': '≥',
  'Ã—': '×',
  'Ã·': '÷'
};

for (const [bad, good] of Object.entries(replacements)) {
  content = content.split(bad).join(good);
}

fs.writeFileSync('src/pages/TopicPage.jsx', content, 'utf8');
console.log('Fixed encoding in TopicPage.jsx');
