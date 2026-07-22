const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const IMG_DIR_PIE = path.join(process.cwd(), 'public', 'assets', 'di-images', 'pie-charts');
const IMG_DIR_BAR = path.join(process.cwd(), 'public', 'assets', 'di-images', 'bar-charts');
const IMG_DIR_LINE = path.join(process.cwd(), 'public', 'assets', 'di-images', 'line-graphs');
const IMG_DIR_MIXED = path.join(process.cwd(), 'public', 'assets', 'di-images', 'mixed-di-sets');

const JSON_DIR = path.join(process.cwd(), 'public', 'data', 'quantitative-aptitude', 'data-interpretation');

[IMG_DIR_PIE, IMG_DIR_BAR, IMG_DIR_LINE, IMG_DIR_MIXED, JSON_DIR].forEach(d => {
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

async function generateCharts() {
  console.log("Launching puppeteer...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600, deviceScaleFactor: 2 });

  // 1. Pie Charts
  const pieQs = [];
  console.log("Generating Pie Charts...");
  for (let i = 1; i <= 20; i++) {
    const filename = `pie_${i.toString().padStart(3, '0')}.png`;
    const filepath = path.join(IMG_DIR_PIE, filename);
    
    // Generate data
    const values = [30, 20, 25, 15, 10]; // Total 100%
    const total = 5000;
    
    const html = `
      <html>
      <head><script src="https://cdn.jsdelivr.net/npm/chart.js"></script></head>
      <body style="background: white; padding: 20px; display: flex; justify-content: center; align-items: center;">
        <div style="width: 500px; height: 500px;">
          <canvas id="myChart"></canvas>
        </div>
        <script>
          new Chart(document.getElementById('myChart'), {
            type: 'pie',
            data: {
              labels: ['A', 'B', 'C', 'D', 'E'],
              datasets: [{
                data: ${JSON.stringify(values)},
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
              }]
            },
            options: { plugins: { title: { display: true, text: 'Distribution of Employees (Total: 5000)' } } }
          });
        </script>
      </body>
      </html>
    `;
    await page.setContent(html);
    // wait for chart to render
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: filepath });
    
    // 5 questions per image
    for(let q = 1; q <= 5; q++) {
      let diff = q <= 2 ? 'Easy' : (q <= 4 ? 'Medium' : 'Hard');
      let qText = `What is the total number of employees in department A?`;
      let ans = `${total * values[0] / 100}`;
      if (q === 2) {
        qText = `What is the ratio of employees in C to E?`;
        ans = `5:2`;
      } else if (q === 3) {
        qText = `If 20% of employees in B are transferred to D, what is the new percentage of employees in D?`;
        ans = `19%`;
      } else if (q === 4) {
        qText = `What is the central angle for department C?`;
        ans = `90 degrees`;
      } else if (q === 5) {
        qText = `If the average salary in A is $1000 and in B is $1500, what is the total salary expense for A and B combined?`;
        ans = `$3,000,000`;
      }
      
      pieQs.push(createQuestion(`DI_PIE_${i}_${q}`, "Pie Charts", diff, qText, ans, ['Option 1', 'Option 2', 'Option 3'], `/assets/di-images/pie-charts/${filename}`));
    }
  }
  fs.writeFileSync(path.join(JSON_DIR, 'pie-charts.json'), JSON.stringify(pieQs, null, 2));

  // 2. Bar Charts
  const barQs = [];
  console.log("Generating Bar Charts...");
  for (let i = 1; i <= 20; i++) {
    const filename = `bar_${i.toString().padStart(3, '0')}.png`;
    const filepath = path.join(IMG_DIR_BAR, filename);
    const html = `
      <html>
      <head><script src="https://cdn.jsdelivr.net/npm/chart.js"></script></head>
      <body style="background: white; padding: 20px;">
        <div style="width: 700px; height: 500px;">
          <canvas id="myChart"></canvas>
        </div>
        <script>
          new Chart(document.getElementById('myChart'), {
            type: 'bar',
            data: {
              labels: ['2018', '2019', '2020', '2021', '2022'],
              datasets: [{
                label: 'Revenue (in Millions)',
                data: [120, 150, 180, 130, 200],
                backgroundColor: '#36A2EB'
              }]
            },
            options: { plugins: { title: { display: true, text: 'Company Revenue Over 5 Years' } } }
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
      barQs.push(createQuestion(`DI_BAR_${i}_${q}`, "Bar Charts", diff, `Sample Question ${q} for Bar Chart ${i}`, `Correct Answer`, [`Wrong 1`, `Wrong 2`, `Wrong 3`], `/assets/di-images/bar-charts/${filename}`));
    }
  }
  fs.writeFileSync(path.join(JSON_DIR, 'bar-charts.json'), JSON.stringify(barQs, null, 2));

  // 3. Line Graphs
  const lineQs = [];
  console.log("Generating Line Graphs...");
  for (let i = 1; i <= 20; i++) {
    const filename = `line_${i.toString().padStart(3, '0')}.png`;
    const filepath = path.join(IMG_DIR_LINE, filename);
    const html = `
      <html>
      <head><script src="https://cdn.jsdelivr.net/npm/chart.js"></script></head>
      <body style="background: white; padding: 20px;">
        <div style="width: 700px; height: 500px;">
          <canvas id="myChart"></canvas>
        </div>
        <script>
          new Chart(document.getElementById('myChart'), {
            type: 'line',
            data: {
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              datasets: [{
                label: 'Temperature (C)',
                data: [22, 24, 21, 25, 28],
                borderColor: '#FF6384',
                fill: false
              }]
            },
            options: { plugins: { title: { display: true, text: 'Weekly Temperature' } } }
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
      lineQs.push(createQuestion(`DI_LINE_${i}_${q}`, "Line Graphs", diff, `Sample Question ${q} for Line Graph ${i}`, `Correct Answer`, [`Wrong 1`, `Wrong 2`, `Wrong 3`], `/assets/di-images/line-graphs/${filename}`));
    }
  }
  fs.writeFileSync(path.join(JSON_DIR, 'line-graphs.json'), JSON.stringify(lineQs, null, 2));

  // 4. Mixed DI Sets
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
              datasets: [{ data: [40, 35, 25], backgroundColor: ['red', 'blue', 'green'] }]
            },
            options: { plugins: { title: { display: true, text: 'Market Share' } } }
          });
          new Chart(document.getElementById('barChart'), {
            type: 'bar',
            data: {
              labels: ['X', 'Y', 'Z'],
              datasets: [{ label: 'Profit', data: [10, 20, 15], backgroundColor: 'purple' }]
            },
            options: { plugins: { title: { display: true, text: 'Company Profit' } } }
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
      mixQs.push(createQuestion(`DI_MIX_${i}_${q}`, "Mixed DI", diff, `Sample Question ${q} for Mixed DI ${i}`, `Correct Answer`, [`Wrong 1`, `Wrong 2`, `Wrong 3`], `/assets/di-images/mixed-di-sets/${filename}`));
    }
  }
  fs.writeFileSync(path.join(JSON_DIR, 'mixed-di-sets.json'), JSON.stringify(mixQs, null, 2));

  await browser.close();
  console.log("All DI generated!");
}

generateCharts().catch(console.error);
