/* eslint-disable */
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('#upload-file');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('#upload-cancel');

//Обработчик загрузки изображения
const onUploadInputChange = () => {
  editForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

uploadInput.addEventListener('change', onUploadInputChange);

