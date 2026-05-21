import fs from "fs";

const data = fs
  .readFileSync("soc-schedule-data.js", "utf8")
  .replace(/export const /g, "const ")
  .replace(/export function /g, "function ")
  .replace(/export /g, "");

let html = fs.readFileSync("index-soc.html", "utf8");
html = html.replace(
  /<script src="soc-schedule-data\.js" type="module"><\/script>\s*<script type="module">/,
  "<script>"
);
html = html.replace(/import \{[\s\S]*?\} from "\.\/soc-schedule-data\.js";\s*/, "");
html = html.replace(
  /<script>\s*\n\s*function showError/,
  `<script>\n${data}\n\n    function showError`
);

fs.writeFileSync("schedule.html", html);
const check = fs.readFileSync("schedule.html", "utf8");
if (!check.includes("const PROJECT")) {
  console.error("BUILD FAILED: data not injected");
  process.exit(1);
}
console.log("Built schedule.html", fs.statSync("schedule.html").size, "bytes");
