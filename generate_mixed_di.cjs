const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const IMG_DIR_MIXED = path.join(process.cwd(), 'public', 'assets', 'di-images', 'mixed-di-sets');
const JSON_DIR = path.join(process.cwd(), 'public', 'data', 'quantitative-aptitude', 'data-interpretation');

[IMG_DIR_MIXED, JSON_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const createQuestion = (id, subtopic, diff, q, ans, wrongOpts, imgPath) => {
  const options = [ans, ...wrongOpts].sort(() => 0.5 - Math.random());
  return {
    id,
    topic: "Data Interpretation",
    subtopic,
    difficulty: diff,
    question: q,
    options,
    correctAnswer: options.indexOf(ans),
    answer: ans,
    tags: ["DI", subtopic.toLowerCase().replace(' ', '-')],
    estimatedTime: diff === 'Easy' ? 60 : (diff === 'Medium' ? 90 : 120),
    image: imgPath
  };
};

async function generateMixed() {
  console.log("Launching puppeteer for Mixed DI...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });

  const mixQs = [];
  console.log("Generating Mixed DI...");
  for (let i = 1; i <= 20; i++) {
    const filename = `mixed_${i.toString().padStart(3, '0')}.png`;
    const filepath = path.join(IMG_DIR_MIXED, filename);
    const html = `
      <html>
      <head><script src="https://cdn.jsdelivr.net/npm/chart.js"></script></head>
      <body style="background: white; padding: 20px; display: flex; gap: 20px;">
        <div style="width: 350px; height: 350px;"><canvas id="pieChart"></canvas></div>
        <div style="width: 350px; height: 350px;"><canvas id="barChart"></canvas></div>
        <script>
          new Chart(document.getElementById('pieChart'), {
            type: 'pie',
            data: {
              labels: ['X', 'Y', 'Z'],
              datasets: [{ data: [40, 35, 25], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }]
            },
            options: { plugins: { title: { display: true, text: 'Market Share' } }, animation: false }
          });
          new Chart(document.getElementById('barChart'), {
            type: 'bar',
            data: {
              labels: ['X', 'Y', 'Z'],
              datasets: [{ label: 'Profit (in Millions)', data: [10, 20, 15], backgroundColor: '#9966FF' }]
            },
            options: { plugins: { title: { display: true, text: 'Company Profit' } }, animation: false }
          });
        </script>
      </body>
      </html>
    `;
    await page.setContent(html);
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: filepath });
    
    for(let q = 1; q <= 5; q++) {
      let diff = q <= 2 ? 'Easy' : (q <= 4 ? 'Medium' : 'Hard');
      mixQs.push(createQuestion(`DI_MIX_${i}_${q}`, "Mixed DI", diff, `Sample Question ${q} for Mixed DI Set ${i}`, `Correct Answer`, [`Wrong 1`, `Wrong 2`, `Wrong 3`], `/assets/di-images/mixed-di-sets/${filename}`));
    }
  }
  fs.writeFileSync(path.join(JSON_DIR, 'mixed-di-sets.json'), JSON.stringify(mixQs, null, 2));

  await browser.close();
  console.log("Mixed DI generated!");
}

generateMixed().catch(console.error);
