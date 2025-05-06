const effectsRadioButtons = document.querySelectorAll('.effects__radio');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectLevelBlock = document.querySelector('.effect-level');

// Скрываем слайдер по умолчанию
effectLevelBlock.classList.add('hidden');

const getEffectStyle = (effectName, value) => {
  switch (effectName) {
    case 'chrome': return `grayscale(${value})`;
    case 'sepia': return `sepia(${value})`;
    case 'marvin': return `invert(${value}%)`;
    case 'phobos': return `blur(${value}px)`;
    case 'heat': return `brightness(${value})`;
    default: return '';
  }
};

const resetEffect = () => {
  imgPreview.className = '';
  imgPreview.style.filter = '';
};

// Функция для применения эффекта
const applyEffect = (effectName) => {
  resetEffect();

  if (effectName === 'none') {
    effectLevelBlock.classList.add('hidden');
    effectLevelValue.value = '';
    return;
  }

  imgPreview.classList.add(`effects__preview--${effectName}`);
  effectLevelBlock.classList.remove('hidden');

  let sliderOptions;
  let defaultValue; // Добавляем переменную для начального значения слайдера

  switch (effectName) {
    case 'chrome':
    case 'sepia':
      sliderOptions = { min: 0, max: 1, step: 0.1, start: 1 };
      defaultValue = 1;
      break;
    case 'marvin':
      sliderOptions = { min: 0, max: 100, step: 1, start: 100 };
      defaultValue = 100;
      break;
    case 'phobos':
      sliderOptions = { min: 0, max: 3, step: 0.1, start: 3 };
      defaultValue = 3;
      break;
    case 'heat':
      sliderOptions = { min: 1, max: 3, step: 0.1, start: 3 };
      defaultValue = 3;
      break;
    default:
      sliderOptions = { min: 0, max: 1, step: 0.1, start: 1 };
      defaultValue = 1;
  }

  // Обновление слайдера с новыми параметрами
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: sliderOptions.min,
      max: sliderOptions.max
    },
    start: sliderOptions.start,
    step: sliderOptions.step
  });

  // Обновление значения слайдера и фильтра
  effectLevelValue.value = defaultValue;
  imgPreview.style.filter = getEffectStyle(effectName, defaultValue);
};

const initializeSlider = () => {
  window.noUiSlider.create(effectSlider, {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    connect: 'lower'
  });

  // Обработчик для обновления слайдера и фильтра
  effectSlider.noUiSlider.on('update', (_, __, [value]) => {
    const currentClass = [...imgPreview.classList].find((cls) => cls.startsWith('effects__preview--'));
    if (!currentClass) {
      return;
    }

    const effectName = currentClass.replace('effects__preview--', '');
    effectLevelValue.value = value;
    imgPreview.style.filter = getEffectStyle(effectName, value);
  });
};

// Слушатели на изменения радиокнопок
effectsRadioButtons.forEach((radio) => {
  radio.addEventListener('change', (evt) => {
    applyEffect(evt.target.value);
  });
});

// Функция сброса эффектов
const resetEffects = () => {
  // Сброс эффекта
  imgPreview.className = '';
  imgPreview.style.filter = '';
  effectLevelValue.value = '';
  effectLevelBlock.classList.add('hidden');

  // Сброс радио на "Оригинал"
  document.querySelector('#effect-none').checked = true;

  // Сброс значений слайдера
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  });
};

initializeSlider();

export { resetEffects };
