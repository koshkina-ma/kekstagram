const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const previewImage = uploadOverlay.querySelector('.img-upload__preview img');
const scaleControlValue = uploadOverlay.querySelector('.scale__control--value');
const scaleSmaller = uploadOverlay.querySelector('.scale__control--smaller');
const scaleBigger = uploadOverlay.querySelector('.scale__control--bigger');
const effectsRadios = uploadOverlay.querySelectorAll('.effects__radio');
const effectLevelSlider = uploadOverlay.querySelector('.effect-level__slider');
const effectLevelValue = uploadOverlay.querySelector('.effect-level__value');

function openUploadForm() {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  resetScale();
  resetEffects();
  initEffectSlider();
}

function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadInput.value = '';
}

function resetScale() {
  scaleControlValue.value = '100%';
  previewImage.style.transform = 'scale(1)';
}

function changeScale(delta) {
  let currentScale = parseInt(scaleControlValue.value, 10);
  currentScale = Math.min(100, Math.max(25, currentScale + delta));
  scaleControlValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
}

function resetEffects() {
  effectsRadios.forEach((radio) => {
    if (radio.value === 'none') {radio.checked = true;}
  });
  previewImage.style.filter = 'none';
  effectLevelSlider.style.display = 'none';
}

function applyEffect(effect, value = 100) {
  effectLevelValue.value = value;
  switch (effect) {
    case 'none':
      previewImage.style.filter = 'none';
      effectLevelSlider.style.display = 'none';
      break;
    case 'chrome': // grayscale
      previewImage.style.filter = `grayscale(${value / 100})`;
      effectLevelSlider.style.display = '';
      break;
    case 'sepia':
      previewImage.style.filter = `sepia(${value / 100})`;
      effectLevelSlider.style.display = '';
      break;
    case 'marvin': // invert
      previewImage.style.filter = `invert(${value}%)`;
      effectLevelSlider.style.display = '';
      break;
    case 'phobos': // blur
      previewImage.style.filter = `blur(${(value * 3) / 100}px)`;
      effectLevelSlider.style.display = '';
      break;
    case 'heat': // brightness
      previewImage.style.filter = `brightness(${1 + (value * 2) / 100})`;
      effectLevelSlider.style.display = '';
      break;
  }
}

function initEffectSlider() {
  // Предполагаем, что используешь noUiSlider
  if (window.noUiSlider && effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.on('update', (values, handle) => {
      const currentEffect = [...effectsRadios].find((r) => r.checked).value;
      applyEffect(currentEffect, Math.round(values[handle]));
    });
  }
}

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];
  if (file) {
    previewImage.src = URL.createObjectURL(file);
  }
  openUploadForm();
});

uploadCancel.addEventListener('click', () => {
  closeUploadForm();
});

scaleSmaller.addEventListener('click', () => changeScale(-25));
scaleBigger.addEventListener('click', () => changeScale(25));

effectsRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    const effect = radio.value;
    if (effect === 'none') {
      applyEffect('none');
    } else {
      effectLevelSlider.style.display = '';
      effectLevelSlider.noUiSlider.set(100);
      applyEffect(effect, 100);
    }
  });
});

// Инициализация слайдера noUiSlider (если используешь его)
if (window.noUiSlider) {
  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower',
  });
  effectLevelSlider.style.display = 'none'; // Скрыть слайдер по умолчанию
}

export { openUploadForm, closeUploadForm };
