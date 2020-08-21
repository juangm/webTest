import { launchBrowser } from '../helpers/browser';

const run = async () => {
  // Set up Puppeteer and Chrome
  const browser = await launchBrowser();
  // Open page
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto('http://localhost:5000/index.html');
  await (await page.$('#item')).type('Create Item 1');
  await (await page.$('#add')).click();

  browser.close();
};

run();
