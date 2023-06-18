const { chromium } = require("@playwright/test");

(async () => {
  // Memulai browser Chromium
  const browser = await chromium.launch({ headless: false });

  // Membuka halaman baru
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.setExtraHTTPHeaders({
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
  });
  await page.goto("https://vvipenjoyers.com/");

  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 4000 + 1000))
  );

  // Scroll the page to load additional content
  await page.evaluate(() => window.scrollBy(0, window.innerHeight));

  // Add another random delay of 1 to 5 seconds
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 4000 + 1000))
  );
  //   await browser.close();
})();
