import './scaleImage.js';
import { resetScale } from './scaleImage.js';

import './effectsSlider.js';
import { resetEffects } from './effectsSlider.js';

import { validateForm, resetValidation } from './validateForm.js';

const uploadInput   = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const formElement   = document.querySelector('.img-upload__form');
const cancelButton  = uploadOverlay.querySelector('#upload-cancel');
const hashtagsInput = formElement.querySelector('.text__hashtags');
const commentInput  = formElement.querySelector('.text__description');
const body          = document.body;

const submitButton  = formElement.querySelector('.img-upload__submit');

// шаблоны для сообщений
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate   = document.querySelector('#error').content.querySelector('.error');

// универсальный показ сообщения
const showMessage = (template) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (!evt.target.closest('div')) {
      closeMessage();
    }
  };

  function closeMessage() {
    message.remove();
    document.removeEventListener('keydown', onEscKeydown);
    message.removeEventListener('click', onOutsideClick);
  }

  message.querySelector('button').addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscKeydown);
  message.addEventListener('click', onOutsideClick);

};

// сброс формы
const resetForm = () => {
  formElement.reset();
  resetScale();
  resetEffects();
  resetValidation();
  uploadInput.value = '';
};

// закрытие формы
const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  resetForm();
  document.removeEventListener('keydown', onDocumentKeydown);
};

// закрытие по Escape
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadForm();
  }
}

// открытие формы
const openUploadForm = () => {
  resetScale();
  resetEffects();
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// не закрывать при вводе
hashtagsInput.addEventListener('keydown', (evt) => evt.stopPropagation());
commentInput.addEventListener('keydown',  (evt) => evt.stopPropagation());

// выбор файла
uploadInput.addEventListener('change', () => {
  openUploadForm();
});

// кнопка отмены
cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadForm();
});

// отправка формы
formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!validateForm()) {
    return;
  }

  submitButton.disabled = true;

  const formData = new FormData(formElement);

  fetch('https://25.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка отправки');
      }
      closeUploadForm();
      showMessage(successTemplate);
    })
    .catch(() => {
      closeUploadForm();
      showMessage(errorTemplate);
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});
