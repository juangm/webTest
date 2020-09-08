import { chromium } from 'playwright';

export const playwrightRun = async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:5000/index.html');

  // Create two items
  await (await page.$('#item')).type('create repo');
  await (await page.$('#add')).click();
  await (await page.$('#item')).type('push first commit');
  await (await page.$('#add')).click();

  // Complete first task
  let firstTask = await page.$('//ul[@id="todo"]/li[text()="create repo"]');
  await (await firstTask.$('button.complete')).click();

  // Complete second task
  let secondTask = await page.$('//ul[@id="todo"]/li[text()="push first commit"]');
  await (await secondTask.$('button.complete')).click();

  // Delete both tasks
  firstTask = await page.$('//ul[@id="completed"]/li[text()="create repo"]');
  await (await firstTask.$('button.remove')).click();
  secondTask = await page.$('//ul[@id="completed"]/li[text()="push first commit"]');
  await (await secondTask.$('button.remove')).click();
  await browser.close();
};

playwrightRun();
