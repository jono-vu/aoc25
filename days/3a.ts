import { parseLinesFromFile } from "../utils/parseLinesFromFile";

function run() {
  const banks = parseLinesFromFile("input/3.txt");

  let sum = 0;

  for (const bank of banks) {
    const bankArr = getBankArr(bank);
    const maxVoltage = getMaxVoltage(bankArr);

    sum += maxVoltage;
  }

  console.log(sum);
}

run();

function getBankArr(bank: string) {
  let bankArr: number[] = [];

  for (const char of bank) {
    bankArr.push(Number(char));
  }

  return bankArr;
}

function getMaxVoltage(bankArr: number[]) {
  const batteryLimit = 2;

  let batteries = [];
  let rollingIdx = -1;

  for (let batteryNumber = 0; batteryNumber < batteryLimit; batteryNumber++) {
    const eligibleArr = bankArr.filter(
      (_v, i) =>
        // rolling window start
        i > rollingIdx &&
        // rolling window end
        i < bankArr.length - (batteryLimit - (batteryNumber + 1)),
    );

    const { digit, i } = getMaxOfRemainingArr(eligibleArr);

    batteries.push(digit);
    rollingIdx = i;
  }

  return Number(batteries.reduce((a, c) => String(a) + String(c), ""));
}

function getMaxOfRemainingArr(arr: number[]) {
  const digit = Math.max(...arr);
  const i = arr.indexOf(digit);

  return { digit, i };
}
