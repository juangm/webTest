import { launchBrowser } from "../helpers/browser";

const run = async () => {
  // Set up Puppeteer and Chrome
  const browser = await launchBrowser();
  // Open page
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto("http://localhost:8080/index.html");

  browser.close();
};

run();
