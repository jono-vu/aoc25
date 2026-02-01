import { parseFileRaw } from "../utils/parseFileRaw";

function run() {
  const raw = parseFileRaw("input/5.txt");

  const [idRangesRaw, idsRaw] = raw.split("\n\n");

  const idRangesStr = idRangesRaw.split("\n");
  const idsStr = idsRaw.split("\n");

  const ids = idsStr.map((str) => Number(str));

  let idRanges: { start: number; end: number }[] = [];

  for (const idRangeStr of idRangesStr) {
    const [startIdStr, endIdStr] = idRangeStr.split("-");

    const start = Number(startIdStr);
    const end = Number(endIdStr);

    idRanges.push({ start, end });
  }

  const freshIds: number[] = [];

  for (const id of ids) {
    if (isFresh(id, idRanges)) {
      freshIds.push(id);
    }
  }

  const numberOfFreshIngredients = freshIds.length;

  // console.log({
  //   idRanges,
  //   ids,
  //   numberOfFreshIngredients,
  // });

  console.log(numberOfFreshIngredients);
}

run();

function isFresh(
  id: number,
  idRanges: {
    start: number;
    end: number;
  }[],
) {
  let fresh = false;

  for (const idRange of idRanges) {
    const { start, end } = idRange;

    if (id >= start && id <= end) {
      fresh = true;
    }
  }

  return fresh;
}
