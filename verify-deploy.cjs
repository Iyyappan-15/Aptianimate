const https = require('https');
https.get('https://aptianimate.vercel.app/', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const match = data.match(/src="\/assets\/index-([a-zA-Z0-9_-]+)\.js"/);
    if (!match) return;
    https.get('https://aptianimate.vercel.app/assets/index-' + match[1] + '.js', (res2) => {
      let jsData = '';
      res2.on('data', (c) => jsData += c);
      res2.on('end', () => {
        let lastIndex = 0;
        let count = 0;
        while (count < 5) {
          const i = jsData.indexOf('.username', lastIndex);
          if (i === -1) break;
          console.log(`\nMatch ${count}:`, jsData.substring(i - 40, i + 200));
          lastIndex = i + 1;
          count++;
        }
      });
    });
  });
});
