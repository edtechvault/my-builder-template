// evals/lighthouse.mjs
import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';

const url = process.argv[2] || 'http://localhost:5173';
const args = process.argv.slice(3);
const get = (k, d) => {
  const m = args.find(a => a.startsWith(`--${k}=`));
  return m ? Number(m.split('=')[1]) : d;
};
const thresholds = {
  perf: get('perf', 85),
  a11y: get('a11y', 90),
  bp: get('bp', 95),
  seo: get('seo', 90),
};

// If 9222 is occupied, change to another port like 9223.
const port = 9222;

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', `--remote-debugging-port=${port}`],
});

let lhr;
try {
  const runnerResult = await lighthouse(url, {
    port,
    output: 'json',
    logLevel: 'error',
  });
  lhr = runnerResult.lhr;
} finally {
  await browser.close().catch(() => {});
}

const scores = {
  perf: Math.round((lhr.categories.performance.score || 0) * 100),
  a11y: Math.round((lhr.categories.accessibility.score || 0) * 100),
  bp: Math.round((lhr.categories['best-practices'].score || 0) * 100),
  seo: Math.round((lhr.categories.seo.score || 0) * 100),
};

console.log('Lighthouse:', scores);
const failed = Object.entries(thresholds).filter(([k, v]) => scores[k] < v);
if (failed.length) {
  console.error('Thresholds failed:', failed);
  process.exit(1);
}
