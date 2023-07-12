const { chromium } = require("@playwright/test");
const express = require("express");
const app = express();
const fs = require("fs");
const port = 2000;

app.use(express.json());
app.post("/submit-form", async (req, res) => {
  // console.log(req.body.username);
  const username = req.body.username;
  const password = req.body.password;
  const durasi = req.body.durasi;
  const max = req.body.max;
  try {
    if (username || password || durasi || max) {
      const browser = await chromium.launch({ headless: true });
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto("https://nuipanel.com/Panel/login");
      await page.fill("#username", username);
      await page.fill("#password", password);
      await page.click('button[type="submit"]');
      await page.goto("https://nuipanel.com/Panel/keys/generate");
      await page.goto("https://nuipanel.com/Panel/keys/generate");
      // Check apakah ada option select dengan value 3
      await page.waitForTimeout(1000);
      const optionValue = await page.$eval(
        `select option[value="${durasi}"]`,
        (option) => option.textContent
      );
      if (optionValue) {
        await page.fill("#max_devices", max);
        const selectElement = await page.$("select#duration");
        await selectElement.selectOption({ value: durasi });
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
      } else {
        res.status(404).json({
          status: false,
          message: "Durasi tidak terdaftar",
        });
      }
    } else {
      res.status(403).json({
        status: false,
        message: "Username atau password salah",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err,
    });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
