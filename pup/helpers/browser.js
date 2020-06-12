import pup from "puppeteer";
// import bucket from "./bucket";

// List with all switches: https://peter.sh/experiments/chromium-command-line-switches/
const listArgs = [
  "--no-sandbox",
  "--disable-background-networking",
  "--disable-default-app",
  "--disable-sync",
  "--disable-translate",
  "--hide-scrollbars",
  "--metrics-recording-only",
  "--mute-audio",
  "--no-first-run",
  "--safebrowsing-disable-auto-update",
  "--ignore-certificate-errors",
  "--ignore-ssl-errors",
  "--disable-gpu",
  "--ignore-certificate-errors-spki-list",
  "--disable-dev-shm-usage",
  "--remote-debugging-port=9222",
];

// Browser for running the test
export function launchBrowser(slowMotion = 0) {
  return pup.launch({
    headless: true,
    slowMo: slowMotion,
    defaultViewport: {
      width: 1366,
      height: 768,
    },
    args: listArgs,
  });
}

export async function captureFail(browser, path) {
  // Take screenshot of all the pages open
  const pages = await browser.pages();
  let numPage = 0;
  const date = new Date().toISOString();
  // Delete first page (not producing any image)
  console.log("Taking screenshot for failing test");
  pages.splice(0, 1);
  for (let page of pages) {
    await page.screenshot({ path: `helpers/img/fails/${date}Page${numPage}.png`, fullPage: true });
    numPage += 1;
  }
  // Upload images to bucket
  // await bucket.uploadDirectory(`helpers/img/fails/`, `img/fails/${path}`);
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
