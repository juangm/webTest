import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.goto("http://localhost:5000/index.html");
  await browser.close();
})();
