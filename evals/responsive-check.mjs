import puppeteer from "puppeteer";

const url = process.argv[2] || "http://localhost:5173";
const viewports = [390, 768, 1024, 1440];

const browser = await puppeteer.launch({ headless: "new", args:["--no-sandbox"] });
const page = await browser.newPage();

let ok = true;
for (const width of viewports) {
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle2" });

  const hasHScroll = await page.evaluate(() => document.body.scrollWidth > document.documentElement.clientWidth);
  if (hasHScroll) { console.error(`Horizontal scroll at ${width}px`); ok = false; }

  const tooSmall = await page.evaluate(() => {
    const ctAs = Array.from(document.querySelectorAll("a.btn,button.btn"));
    return ctAs.some(el => (el.getBoundingClientRect().width < 44 || el.getBoundingClientRect().height < 44));
  });
  if (tooSmall) { console.error(`CTA below 44x44 at ${width}px`); ok = false; }
}

await browser.close();
if (!ok) process.exit(1);
console.log("Responsive checks passed");
