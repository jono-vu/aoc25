import { readFileSync } from "node:fs";

function parseLinesFromFile(path: string) {
  const rawText = readFileSync(path, "utf-8");
  return rawText.split("\n");
}

export { parseLinesFromFile };
