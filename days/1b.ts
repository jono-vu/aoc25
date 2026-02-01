import { parseLinesFromFile } from "../utils/parseLinesFromFile";

function run() {
  const instructions = parseLinesFromFile("input/1.txt");

  let v = 50;
  let hit0 = 0;

  for (const instruction of instructions) {
    const direction = instruction[0];
    const amount = Number(instruction.slice(1));

    for (let i = 0; i < amount; i++) {
      if (direction === "L") {
        v--;

        v = normalise(v);

        if (v % 100 === 0) {
          hit0++;
        }
      } else if (direction === "R") {
        v++;

        v = normalise(v);

        if (v % 100 === 0) {
          hit0++;
        }
      }
    }

    // console.log({ instruction, v, hit0 });
  }

  console.log(hit0);
}

run();

function normalise(v: number) {
  if (v >= 0 && v <= 99) {
    return v;
  }

  let output = v;

  if (v < 0) {
    output += 100;
  }

  if (v > 99) {
    output -= 100;
  }

  return normalise(output);
}
