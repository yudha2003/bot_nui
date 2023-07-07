const { chromium } = require("@playwright/test");
const express = require("express");
const app = express();
const fs = require("fs");
const port = 2000;

app.use(express.json());

async function orders(url, formData) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(__dirname + "/result.html");

  const successAlert = await page.$(".alert-success");
  if (successAlert) {
    const key = await page.$(".key-sensi");
    if (key) {
      const keySensi = await page.$eval(".key-sensi", (element) =>
        element.textContent.trim()
      );
      const data = { status: true, key: keySensi };
      console.log(data);
    }
  } else {
    const data = { status: false, key: null };
    console.log(data);
  }
}
app.post("/submit-form", async (req, res) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://nuipanel.com");
  await page.fill("#username", "kyynibos");
  await page.fill("#password", "dgstoreid");
  await page.click('button[type="submit"]');
  await page.goto("https://nuipanel.com/Panel/keys/generate");
  await page.goto("https://nuipanel.com/Panel/keys/generate");
  // Check apakah ada option select dengan value 3
  const optionValue = await page.$eval(
    'select option[value="3"]',
    (option) => option.textContent
  );
  if (optionValue) {
    console.log("Ada elemen select dengan value 3.");
  } else {
    console.log("Tidak ada elemen select dengan value 3.");
  }
  // const selectElement = await page.$("select#duration");
  // await selectElement.selectOption({ value: "3" });
  const html = await page.content();
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);

  const successAlert = await page.$(".alert-success");
  if (successAlert) {
    const key = await page.$(".key-sensi");
    if (key) {
      const keySensi = await page.$eval(".key-sensi", (element) =>
        element.textContent.trim()
      );
      const data = { status: true, key: keySensi };
      res.status(200).json(data);
    }
  } else {
    const data = { status: false, key: null };
    res.status(404).json(data);
  }
  await browser.close();
});
orders();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
