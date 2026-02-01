import { readFileSync } from "node:fs";

function parseFileRaw(path: string) {
  const rawText = readFileSync(path, "utf-8");
  return rawText;
}

export { parseFileRaw };
