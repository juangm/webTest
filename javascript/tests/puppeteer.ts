import { launchBrowser, sleep } from '../helpers/browser';

const run = async () => {
  // Set up Puppeteer and Chrome
  const browser = await launchBrowser();
  // Open page
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto('http://localhost:5000/index.html');

  // Create two items
  await (await page.$('#item')).type('create repo');
  await (await page.$('#add')).click();
  await (await page.$('#item')).type('push first commit');
  await (await page.$('#add')).click();

  // Complete first task
  let firstTask = await page.$x('//ul[@id="todo"]/li[text()="create repo"]');
  await (await firstTask[0].$('button.complete')).click();

  // Complete second task
  let secondTask = await page.$x('//ul[@id="todo"]/li[text()="push first commit"]');
  await (await secondTask[0].$('button.complete')).click();

  // Delete both tasks
  firstTask = await page.$x('//ul[@id="completed"]/li[text()="create repo"]');
  await (await firstTask[0].$('button.remove')).click();
  secondTask = await page.$x('//ul[@id="completed"]/li[text()="push first commit"]');
  await (await secondTask[0].$('button.remove')).click();
  browser.close();
};

run();
