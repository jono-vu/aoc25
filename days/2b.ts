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
        // console.log("invalid " + i);
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

  const factors = getFactors(v);

  if (factors.length === 0) {
    return true;
  }

  let allPairsArr = [];

  for (const factor of factors) {
    let isAllPairs = true;
    const chunkLength = numberStr.length / factor;

    const checkChunk = numberStr.slice(0, chunkLength);

    for (let i = 0; i < factor; i++) {
      const matchChunk = numberStr.slice(
        i * chunkLength,
        (i + 1) * chunkLength,
      );

      if (matchChunk !== checkChunk) {
        isAllPairs = false;
        continue;
      }
    }

    if (isAllPairs) {
      allPairsArr.push({
        factor,
        checkChunk,
      });
    }
  }

  if (allPairsArr.length > 0) {
    return false;
  }

  return true;
}

function getFactors(v: number) {
  const numberStr = String(v);

  let factors: number[] = [];

  for (let i = 1; i <= numberStr.length; i++) {
    if (numberStr.length % i === 0) {
      factors.push(i);
    }
  }

  factors = factors.filter((f) => f !== 1);

  return factors;
}
