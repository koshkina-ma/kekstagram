import { showBigPicture } from './bigPicture.js';

const renderThumbnails = function (photos) {
  const container = document.querySelector('.pictures');
  const template = document.querySelector('#picture');
  const fragment = document.createDocumentFragment();

  // Удаляем старые миниатюры перед добавлением новых
  container.querySelectorAll('.picture').forEach((el) => el.remove());

  photos.forEach((photo) => {
    const photoElement = template.content.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    // Добавляем обработчик клика на миниатюру
    const imgElement = photoElement.querySelector('.picture__img');
    imgElement.addEventListener('click', () => {
      showBigPicture(photo); // Передаем данные фотографии в showBigPicture
    });

    fragment.appendChild(photoElement);
  });

  container.appendChild(fragment);
};

export { renderThumbnails };
