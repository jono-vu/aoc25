import { parseLinesFromFile } from "../utils/parseLinesFromFile";

function run() {
  const rawRows = parseLinesFromFile("input/4.txt");

  const rows = rawRows.map((rawRow) => rawRow.split(""));

  const { paperCleanedSum } = checkForCleanablePapers(rows, 0);

  console.log(paperCleanedSum);
}

run();

function checkForCleanablePapers(rows: string[][], paperCleanedSum: number) {
  let output = rows;

  let papersToBeRemoved: { x: number; y: number }[] = [];
  let paperCleanedSumOutput = paperCleanedSum;

  for (let y = 0; y < output.length; y++) {
    for (let x = 0; x < output[y].length; x++) {
      if (!isPaper({ x, y }, output)) {
        continue;
      }

      const sum = checkSurroundingPaper({ x, y }, output);

      if (sum < 4) {
        papersToBeRemoved = [...papersToBeRemoved, { x, y }];
        paperCleanedSumOutput++;
      }
    }
  }

  // console.log(renderRows(output), papersToBeRemoved);

  if (papersToBeRemoved.length === 0) {
    return {
      output,
      paperCleanedSum: paperCleanedSumOutput,
    };
  }

  return checkForCleanablePapers(
    cleanPaper(output, papersToBeRemoved),
    paperCleanedSumOutput,
  );
}

function cleanPaper(
  rows: string[][],
  removablePapers: { x: number; y: number }[],
) {
  let output = rows;

  removablePapers.forEach(({ x, y }) => (output[y][x] = "."));

  return output;
}

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

function renderRows(rows: string[][]) {
  console.log(rows.map((c) => c.join("")).join("\n"));
}
