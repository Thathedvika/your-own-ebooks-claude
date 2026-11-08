// Vygeneruje journal/denni-journal-A4.pdf z journal/journal.html (Chromium přes Playwright).
// Spuštění: node journal/build.js
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'journal.html'));
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: path.join(__dirname, 'denni-journal-A4.pdf'),
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();
})();
