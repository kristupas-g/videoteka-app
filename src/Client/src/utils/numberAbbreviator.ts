export function abbreviateNumber(number: number) {
  const abbreviations = ["", "K", "M", "B"];
  let index = 0;

  if (number < 1000) {
    return `${number}`;
  }

  while (number >= 1000) {
    number /= 1000;
    index++;
  }

  return `${number.toFixed(1)}${abbreviations[index]}`;
}
