// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveFloat (arg1, arg2, digits = 1) {
  const lower = Math.min(Math.abs(arg1), Math.abs(arg2));
  const upper = Math.max(Math.abs(arg1), Math.abs(arg2));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

function getRandomPositiveInteger (arg1, arg2) {
  const lower = Math.ceil(Math.min(Math.abs(arg1), Math.abs(arg2)));
  const upper = Math.floor(Math.max(Math.abs(arg1), Math.abs(arg2)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export {getRandomPositiveFloat, getRandomPositiveInteger};
