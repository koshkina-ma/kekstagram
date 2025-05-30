const getRandomInt = function (min, max) {
  if (min < 0 || max < 0) {
    throw new RangeError('Диапазон должен быть только положительным, включая ноль.');
  }
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;

};


const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];


function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, args), timeoutDelay);
  };
}

export {getRandomInt, getRandomArrayElement, debounce};
