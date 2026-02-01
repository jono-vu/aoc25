import { parseFileRaw } from "../utils/parseFileRaw";

function run() {
  const rawProductIdPairs = parseFileRaw("input/2.txt");
  const productIdPairs = rawProductIdPairs.split(",");

  let invalidNumberSum = 0;

  for (const productIdPair of productIdPairs) {
    const [firstProductIdStr, lastProductIdStr] = productIdPair.split("-");

    const firstProductId = Number(firstProductIdStr);
    const lastProductId = Number(lastProductIdStr);

    for (let i = firstProductId; i <= lastProductId; i++) {
      const valid = validateNumber(i);

      if (!valid) {
        invalidNumberSum += i;
      }
    }

    // console.log({ firstProductId, lastProductId });
  }

  console.log(invalidNumberSum);
}

run();

function validateNumber(v: number): boolean {
  const numberStr = String(v);

  if (numberStr.length % 2 !== 0) {
    return true;
  }

  const halfwayIdx = numberStr.length / 2;

  const firstHalf = numberStr.slice(0, halfwayIdx);
  const secondHalf = numberStr.slice(halfwayIdx);

  if (firstHalf === secondHalf) {
    // console.log("invalid" + v);
    return false;
  }

  return true;
}
