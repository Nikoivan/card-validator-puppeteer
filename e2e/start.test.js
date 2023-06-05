import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);

describe("Page start", () => {
  let browser;
  let page;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });
    browser = await puppeteer.launch({
      // headless: false,
      //  slowMo: 100,
      //  devtools: true,
    });

    page = await browser.newPage();
  });

  test("test to check valid card number", async () => {
    await page.goto(baseUrl);

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
    await page.goto(baseUrl);

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
    server.kill();
  });
});
