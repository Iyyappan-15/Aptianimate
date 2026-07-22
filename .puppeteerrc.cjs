/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Instructs Puppeteer not to download Chromium during npm install.
  // This speeds up Vercel and CI build times significantly.
  skipDownload: true,
};
