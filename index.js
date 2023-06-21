const { chromium } = require("@playwright/test");
const express = require("express");
const app = express();
const fs = require("fs");
const port = 2000;

app.use(express.json());

async function orders(url, formData) {
  // Memulai browser Chromium
  const browser = await chromium.launch({ headless: false });

  // Membuka halaman baru
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(__dirname + "/output.html");
  // await page.fill("#username", "kyynibos");
  // await page.fill("#password", "dgstoreid");
  // await page.click('button[type="submit"]');

  // // Menunggu halaman login selesai
  // // await page.waitForNavigation();

  // console.log("Login berhasil!");

  // // Mengarahkan ke halaman generate keys
  // await page.goto("https://xcode-nui-org.com/Panel/keys/generate");
  // // const selectElement = await page.$("select#duration");
  // await page.goto("https://xcode-nui-org.com/Panel/keys/generate");

  // // Memilih opsi berdasarkan nilai (value) atau teksnya
  // // cari text Create License
  const selectElement = await page.$("select#duration");

  await selectElement.selectOption({ value: "7" });
  console.log("berhasil");
  // // Menutup browser

  // const htmlContent = await page.content();

  // fs.writeFileSync("output.html", htmlContent);
  // await browser.close();
}
app.post("/submit-form", async (req, res) => {
  orders();
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
