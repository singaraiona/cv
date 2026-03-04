const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.emulateMediaType('screen');
  await page.setViewport({ width: 1200, height: 1600 });

  const filePath = path.resolve(__dirname, 'anton_kundenko_cv.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // Remove body padding and page border-radius/shadow for clean PDF
  // Add top margin on pages after the first
  await page.evaluate(() => {
    document.body.style.padding = '0';
    document.body.style.background = 'white';
    const pg = document.querySelector('.page');
    pg.style.borderRadius = '0';
    pg.style.boxShadow = 'none';
    pg.style.border = 'none';
    pg.style.maxWidth = '100%';

    const style = document.createElement('style');
    style.textContent = `
      @page { margin: 0; }
      @page :first { margin-top: 0; }
      @page { margin-top: 24px; }
    `;
    document.head.appendChild(style);
  });

  await page.pdf({
    path: path.resolve(__dirname, 'anton_kundenko_cv.pdf'),
    format: 'A4',
    scale: 0.62,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log('PDF generated successfully');
})();
