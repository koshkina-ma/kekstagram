import './scaleImage.js';
import { resetScale } from './scaleImage.js';
//import './effectsSlider.js';
import { validateForm, resetValidation } from './validateForm.js';

const uploadInput   = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const formElement   = document.querySelector('.img-upload__form');
const cancelButton  = uploadOverlay.querySelector('#upload-cancel');
const hashtagsInput = formElement.querySelector('.text__hashtags');
const commentInput  = formElement.querySelector('.text__description');
const body          = document.body;

// Закрытие формы
const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  formElement.reset();
  uploadInput.value = '';
  resetValidation();
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Обработчик Escape
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadForm();
  }
}

// Открытие формы
const openUploadForm = () => {
  resetScale();
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// Чтобы Esc не закрывал форму при вводе
hashtagsInput.addEventListener('keydown', (evt) => evt.stopPropagation());
commentInput.addEventListener('keydown',  (evt) => evt.stopPropagation());

// Слушатели
uploadInput.addEventListener('change', () => {
  openUploadForm();
});

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadForm();
});

// Валидация на сабмите
formElement.addEventListener('submit', (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
});
