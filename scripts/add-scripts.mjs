import fs from "fs";
const p = JSON.parse(fs.readFileSync("package.json","utf8"));
p.scripts = { ...(p.scripts||{}),
  "eval:lighthouse": "node ./evals/lighthouse.mjs http://localhost:5173 --perf=85 --a11y=90 --bp=95 --seo=90",
  "eval:responsive": "node ./evals/responsive-check.mjs http://localhost:5173",
  "kpi:week": "node -e \"console.log('Phase-A KPIs: 10-15 comps, reuse =70%, Perf=85')\""
};
fs.writeFileSync("package.json", JSON.stringify(p, null, 2));
console.log("? scripts added");
