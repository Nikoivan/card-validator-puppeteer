import puppeteer from "puppeteer";

jest.setTimeout(20000);

describe("Page start", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test("test to check valid card number", async () => {
    await page.goto("http://localhost:9000");

    const cardWidget = await page.waitForSelector(".card-widget");

    const form = await cardWidget.$(".form");
    const input = await form.$(".input");
    const btn = await form.$(".btn");

    await input.type("371449635398431");
    await btn.click();

    const cardList = await page.waitForSelector(".card-list");
    const deactiveArr = await cardList.$$(".deactive");

    expect(deactiveArr.length).toBe(6);
  });

  test("test to check invalid", async () => {
    await page.goto("http://localhost:9000");

    const cardWidget = await page.waitForSelector(".card-widget");

    const form = await cardWidget.$(".form");
    const input = await form.$(".input");
    const btn = await form.$(".btn");

    await input.type("37144963539843");
    await btn.click();

    const cardList = await page.waitForSelector(".card-list");
    const deactiveArr = await cardList.$$(".deactive");

    expect(deactiveArr.length).toBe(0);
  });

  afterAll(async () => {
    await browser.close();
  });
});
