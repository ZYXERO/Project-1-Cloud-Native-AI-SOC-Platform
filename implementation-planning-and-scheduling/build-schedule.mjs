import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dataPath = path.join(__dirname, "soc-schedule-data.js");
const templatePath = path.join(__dirname, "index-soc.html");
const outputPath = path.join(__dirname, "schedule.html");

const data = fs
  .readFileSync(dataPath, "utf8")
  .replace(/export const /g, "const ")
  .replace(/export function /g, "function ")
  .replace(/export /g, "");

let html = fs.readFileSync(templatePath, "utf8");
html = html.replace(
  /<script src="soc-schedule-data\.js" type="module"><\/script>\s*<script type="module">/,
  "<script>"
);
html = html.replace(/import \{[\s\S]*?\} from "\.\/soc-schedule-data\.js";\s*/, "");
html = html.replace(
  /<script>\s*\n\s*function showError/,
  `<script>\n${data}\n\n    function showError`
);

fs.writeFileSync(outputPath, html);
const check = fs.readFileSync(outputPath, "utf8");
if (!check.includes("const PROJECT")) {
  console.error("BUILD FAILED: data not injected");
  process.exit(1);
}
console.log("Built schedule.html", fs.statSync(outputPath).size, "bytes");
