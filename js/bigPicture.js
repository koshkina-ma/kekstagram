const COMMENTS_STEP = 5;
const bigPictureModal = document.querySelector('.big-picture');
const bigPictureImage = bigPictureModal.querySelector('.big-picture__img img');
const likesCountElement = bigPictureModal.querySelector('.likes-count');
const commentsList = bigPictureModal.querySelector('.social__comments');
const descriptionElement = bigPictureModal.querySelector('.social__caption');
const commentCountBlock = bigPictureModal.querySelector('.social__comment-count');
const commentsLoaderButton = bigPictureModal.querySelector('.comments-loader');
const closeModalButton = bigPictureModal.querySelector('#picture-cancel');

let allComments = [];
let displayedCount = 0;

// Создание одного комментария
const createCommentElement = (comment) => {
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

  return commentElement;
};

// Обновление счётчика комментариев
const updateCommentCounter = () => {
  commentCountBlock.innerHTML = `${displayedCount} из <span class="comments-count">${allComments.length}</span> комментариев`;
};

// Отрисовка следующей порции комментариев
const renderNextComments = () => {
  const nextComments = allComments.slice(displayedCount, displayedCount + COMMENTS_STEP);
  nextComments.forEach((comment) => {
    commentsList.appendChild(createCommentElement(comment));
  });

  displayedCount += nextComments.length;
  updateCommentCounter();

  if (displayedCount >= allComments.length) {
    commentsLoaderButton.classList.add('hidden');
  }
};

// Открытие модального окна
const openBigPicture = () => {
  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// Отображение полноразмерной фотографии
const showBigPicture = (photoData) => {
  openBigPicture();
  bigPictureImage.src = photoData.url;
  likesCountElement.textContent = photoData.likes;
  descriptionElement.textContent = photoData.description;

  allComments = photoData.comments;
  displayedCount = 0;
  commentsList.innerHTML = '';
  commentCountBlock.classList.remove('hidden');

  renderNextComments();

  commentsLoaderButton.classList.remove('hidden');
};

// Закрытие модального окна
const closeBigPicture = () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentCountBlock.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');
};

// Обработчики
commentsLoaderButton.addEventListener('click', renderNextComments);

closeModalButton.addEventListener('click', () => closeBigPicture());

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeBigPicture();
  }
});

bigPictureModal.addEventListener('click', (evt) => {
  if (evt.target === bigPictureModal) {
    closeBigPicture();
  }
});

export {
  showBigPicture,
  closeBigPicture
};
