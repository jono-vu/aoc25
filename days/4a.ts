import { parseLinesFromFile } from "../utils/parseLinesFromFile";

function run() {
  const rawRows = parseLinesFromFile("input/4.txt");

  const rows = rawRows.map((rawRow) => rawRow.split(""));

  let accessiblePaper = 0;

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const cell = rows[y][x];

      const isPaper = cell === "@";

      if (!isPaper) {
        continue;
      }

      const surroundingPapersSum = checkSurroundingPaper({ x, y }, rows);

      if (surroundingPapersSum < 4) {
        accessiblePaper++;
      }
    }
  }

  console.log(accessiblePaper);
}

run();

function checkSurroundingPaper(
  position: {
    x: number;
    y: number;
  },
  rows: string[][],
) {
  let paperSum = 0;

  // row above
  for (let x = -1; x <= 1; x++) {
    const newX = position.x + x;
    const newY = position.y - 1;

    if (isPaper({ x: newX, y: newY }, rows)) {
      paperSum++;
    }
  }

  // same row
  for (let x = -1; x <= 1; x++) {
    const newX = position.x + x;
    const newY = position.y;

    if (x === 0) {
      continue;
    }

    if (isPaper({ x: newX, y: newY }, rows)) {
      paperSum++;
    }
  }

  // row below
  for (let x = -1; x <= 1; x++) {
    const newX = position.x + x;
    const newY = position.y + 1;

    if (isPaper({ x: newX, y: newY }, rows)) {
      paperSum++;
    }
  }

  return paperSum;
}

function isPaper(
  position: {
    x: number;
    y: number;
  },
  rows: string[][],
) {
  const bounds = {
    x: rows[0].length - 1,
    y: rows.length - 1,
  };

  if (position.y < 0 || position.y > bounds.y) {
    return false;
  }

  if (position.x < 0 || position.x > bounds.x) {
    return false;
  }

  // console.log(position, rows[position.y][position.x]);

  return rows[position.y][position.x] === "@";
}
