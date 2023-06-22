const { chromium } = require("@playwright/test");
const express = require("express");
const app = express();
const fs = require("fs");
const port = 2000;

app.use(express.json());

async function orders(url, formData) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(__dirname + "/result.html");
}
app.post("/submit-form", async (req, res) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://xcode-nui-org.com");
  await page.fill("#username", "kyynibos");
  await page.fill("#password", "dgstoreid");
  await page.click('button[type="submit"]');
  await page.goto("https://xcode-nui-org.com/Panel/keys/generate");
  await page.goto("https://xcode-nui-org.com/Panel/keys/generate");
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
      // json encode
      const json = JSON.stringify(data);
      console.log(data.key);
    }
  } else {
    const data = { status: false, key: null };
    console.log(json);
  }
  fs.writeFileSync("result.html", html);
  await browser.close();
});
orders();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
