/* eslint-disable */

const renderThumbnails = function (photos) {
  const container = document.querySelector('.pictures');
  const template = document.querySelector('#picture');
  const fragment = document.createDocumentFragment();

 photos.forEach((photo) => {
  const photoElement = template.content.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  fragment.appendChild(photoElement);
});

container.appendChild(fragment);
};

export { renderThumbnails };
