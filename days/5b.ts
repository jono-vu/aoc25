// @TODO. find the difference between date ranges and use addition / subtraction.

import { parseFileRaw } from "../utils/parseFileRaw";

function run() {
  const raw = parseFileRaw("input/5.txt");

  const [idRangesRaw, _idsRaw] = raw.split("\n\n");

  const idRangesStr = idRangesRaw.split("\n");

  let idRanges: { start: number; end: number }[] = [];

  for (const idRangeStr of idRangesStr) {
    const [startIdStr, endIdStr] = idRangeStr.split("-");

    const start = Number(startIdStr);
    const end = Number(endIdStr);

    idRanges.push({ start, end });
  }

  const freshIds = getFreshIdsFromRanges(idRanges);

  console.log(Object.keys(freshIds).length);
}

run();

function getFreshIdsFromRanges(
  idRanges: {
    start: number;
    end: number;
  }[],
) {
  let freshIds: Record<number, boolean> = {};

  for (const idRange of idRanges) {
    console.log(idRange);
    const { start, end } = idRange;

    for (let i = start; i <= end; i++) {
      if (!freshIds[i]) {
        freshIds[i] = true;
      }
    }
  }

  return freshIds;
}
