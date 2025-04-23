import { getRandomInt, getRandomArrayElement } from './utils.js';
import { COMMENT_MESSAGES, COMMENTER_NAMES, PHOTO_DESCRIPTIONS } from './data.js';

let commentIdCounter = 1;

const generatePhotoMeta = (id) => {

  const commentCount = getRandomInt(1, 5);

  const comments = Array.from({ length: commentCount }, () => ({
    id: commentIdCounter++,
    avatar: 'img/avatar' + getRandomInt(1, 6) + '.svg',
    message: getRandomArrayElement(COMMENT_MESSAGES),
    name: getRandomArrayElement(COMMENTER_NAMES)
  }));

  return {
    id: id,
    url: 'photos/' + id + '.jpg',
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomInt(15, 200),
    comments: comments
  };
};

const generatePhotos = function(count) {
  return Array.from({ length: count }, (_, i) => generatePhotoMeta(i + 1));
};

export { generatePhotoMeta, generatePhotos };
