/* eslint-disable */
import noUiSlider from '../nouislider/nouislider.js';
import '../nouislider/nouislider.css'

const effectsRadioButtons = document.querySelectorAll('.effects__radio');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectLevelBlock = document.querySelector('.effect-level');

effectLevelBlock.classList.add('hidden');


// Функция для сброса эффекта
const resetEffect = () => {
  imgPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  imgPreview.style.filter = ''; // Сбросить фильтры
  effectSlider.noUiSlider.set(1); // Сбросить уровень интенсивности слайдера
  effectLevelValue.value = 100; // Сбросить значение интенсивности
};

// Функция для применения эффекта
const applyEffect = (effectName, effectValue) => {
  imgPreview.classList.add(`effects__preview--${effectName}`);
  imgPreview.style.filter = getEffectStyle(effectName, effectValue);
};

// Получение стиля фильтра для конкретного эффекта
const getEffectStyle = (effectName, effectValue) => {
  switch (effectName) {
    case 'chrome':
      return `grayscale(${effectValue})`;
    case 'sepia':
      return `sepia(${effectValue})`;
    case 'marvin':
      return `invert(${effectValue}%)`;
    case 'phobos':
      return `blur(${effectValue}px)`;
    case 'heat':
      return `brightness(${effectValue})`;
    default:
      return '';
  }
};

// Настройка слайдера для интенсивности
const initializeSlider = () => {
  noUiSlider.create(effectSlider, {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  // Обновляем значение на слайдере
  effectSlider.noUiSlider.on('update', (_, handle, unencoded) => {
    const effectValue = unencoded[handle];
    effectLevelValue.value = Math.round(effectValue * 100);
    if (imgPreview.classList.contains('effects__preview--chrome')) {
      imgPreview.style.filter = `grayscale(${effectValue})`;
    } else if (imgPreview.classList.contains('effects__preview--sepia')) {
      imgPreview.style.filter = `sepia(${effectValue})`;
    } else if (imgPreview.classList.contains('effects__preview--marvin')) {
      imgPreview.style.filter = `invert(${effectValue * 100}%)`;
    } else if (imgPreview.classList.contains('effects__preview--phobos')) {
      imgPreview.style.filter = `blur(${effectValue * 3}px)`;
    } else if (imgPreview.classList.contains('effects__preview--heat')) {
      imgPreview.style.filter = `brightness(${effectValue * 2})`;
    }
  });
};

// Обработчик изменения радиокнопки
const onEffectChange = (evt) => {
  const effectName = evt.target.value;

  resetEffect(); // Сбросить текущий эффект перед применением нового

  if (effectName === 'none') {
    effectLevelBlock.classList.add('hidden');
    imgPreview.style.filter = ''; // Убираем все фильтры
  } else {
    effectLevelBlock.classList.remove('hidden');
    applyEffect(effectName, 1); // Применить эффект с начальным значением
  }
};

// Инициализация
const initializeEffects = () => {
  effectsRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', onEffectChange);
  });

  initializeSlider(); // Инициализируем слайдер интенсивности
};

initializeEffects(); // Запускаем инициализацию
