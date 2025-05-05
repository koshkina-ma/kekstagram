const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

let scale = 100;

const updateScaleValue = () => {
  scaleValue.value = `${scale}%`;
  imgPreview.style.transform = `scale(${scale / 100})`;
};

scaleControlSmaller.addEventListener('click', () => {
  if (scale > MIN_SCALE) {
    scale -= STEP_SCALE;
    updateScaleValue();
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (scale < MAX_SCALE) {
    scale += STEP_SCALE;
    updateScaleValue();
  }
});

const resetScale = () => {
  scale = 100;
  updateScaleValue();
};

// Инициализация начального масштаба
updateScaleValue();

export { resetScale };
