const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  
  // Wait for splash screen to finish
  await new Promise(r => setTimeout(r, 6000));
  
  const html = await page.content();
  if (html.includes('Something went wrong')) {
    console.log('CRASH DETECTED!');
    const details = await page.$eval('details', el => el.innerText).catch(()=>'');
    console.log('DETAILS:', details);
  } else {
    console.log('NO CRASH DETECTED!');
  }
  
  await browser.close();
  process.exit(0);
})();
