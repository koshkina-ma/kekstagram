const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const likesCountElement = bigPictureModal.querySelector('.likes-count');
const commentsCountElement = bigPictureModal.querySelector('.comments-count');
const commentsList = bigPictureModal.querySelector('.social__comments');
const descriptionElement = bigPictureModal.querySelector('.social__caption');
const commentCountBlock = bigPictureModal.querySelector('.social__comment-count');
const commentsLoaderButton = bigPictureModal.querySelector('.comments-loader');
const closeModalButton = bigPictureModal.querySelector('#picture-cancel');


// Функция для открытия модального окна
const openBigPicture = function () {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// Функция для отрисовки комментариев
const renderComments = function (commentsArray) {
  commentsList.innerHTML = '';

  commentsArray.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const commentImage = document.createElement('img');
    commentImage.classList.add('social__picture');
    commentImage.src = comment.avatar;
    commentImage.alt = comment.name;
    commentImage.width = 35;
    commentImage.height = 35;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;

    commentElement.appendChild(commentImage);
    commentElement.appendChild(commentText);

    commentsList.appendChild(commentElement);
  });
};

// Функция для отображения фотографии в полноразмерном виде
const showBigPicture = function (photoData) {
  openBigPicture();
  bigPictureImage.src = photoData.url;
  likesCountElement.textContent = photoData.likes;
  commentsCountElement.textContent = photoData.comments.length;
  descriptionElement.textContent = photoData.description;

  renderComments(photoData.comments);
  commentCountBlock.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
};

// Функция для закрытия модального окна
const closeBigPicture = function () {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentCountBlock.classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');
};

// Обработчик клика по кнопке закрытия модального окна
closeModalButton.addEventListener('click', () => {
  closeBigPicture();
});

// Обработчик нажатия клавиши Escape для закрытия окна
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
});


export {
  showBigPicture,
  closeBigPicture
};
