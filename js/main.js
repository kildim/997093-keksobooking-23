
/* eslint-disable prefer-const */
/* eslint-disable no-console */
const MIN_BORDER_NEGATIVE = 'Нижняя граница диапазона отрицательна';
const MAX_BORDER_NEGATIVE = 'Верхняя граница диапазона отрицательна';
const MIN_GRATER_MAX = 'Значение нижней границы диапазона больше верхней границы диапазона';
const MIN_EQUAL_MAX = 'Значения верхней и нижней границ диапазона совпадают';

const isNegative = (number) => {
  return number<0;
};
const alertIntervalBordersErrors = (validationResult) => {
  for (let value of validationResult) {
    console.log(`Ошибка указания границ диапазона: ${  value}`);
  }
};
const validateIntervalBorders = (minBorder, maxBorder) => {
  let intervalBordersErrors = [];

  if (isNegative(minBorder)) {
    intervalBordersErrors.push(MIN_BORDER_NEGATIVE);
  }
  if (isNegative(minBorder)) {
    intervalBordersErrors.push(MAX_BORDER_NEGATIVE);
  }
  if (minBorder>maxBorder){
    intervalBordersErrors.push(MIN_GRATER_MAX);
  }
  if (minBorder===maxBorder){
    intervalBordersErrors.push(MIN_EQUAL_MAX);
  }
  return intervalBordersErrors;
};
const isIntervalBordersValid = (minBorder, maxBorder) => {
  const intervalBordersErrors = validateIntervalBorders (minBorder, maxBorder);
  alertIntervalBordersErrors(intervalBordersErrors);
  return !intervalBordersErrors.length;
};

/* eslint-disable no-unused-vars */
const getNaturalInt = (minBorder, maxBorder) => {
  if (isIntervalBordersValid (minBorder, maxBorder)) {
    minBorder = Math.ceil(minBorder);
    maxBorder = Math.floor(maxBorder);
    return (Math.floor(Math.random() * (maxBorder - minBorder + 1)) + minBorder);
  } else {
    console.log('!ОШИБКА В УКАЗАНИИ ДИАПАЗОНА!');
  }
};
const setPrecision = (value, precision) => {
  return value.toFixed(precision);
};
const getUnsignedReal = (minBorder, maxBorder, precision) => {
  if (isIntervalBordersValid (minBorder, maxBorder)) {
    minBorder = Math.ceil(minBorder);
    maxBorder = Math.floor(maxBorder);
    return ((Math.random() * (maxBorder - minBorder + 1)) + minBorder).toFixed(precision);
  } else {
    console.log('!ОШИБКА В УКАЗАНИИ ДИАПАЗОНА!');
  }
};
/* eslint-enable no-unused-vars */
/* eslint-enable no-console */
/* eslint-enable prefer-const */
