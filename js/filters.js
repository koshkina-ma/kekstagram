/* eslint-disable */
import { renderThumbnails } from './ui.js';
import { debounce } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');
const defaultBtn = filtersContainer.querySelector('#filter-default');
const randomBtn = filtersContainer.querySelector('#filter-random');
const discussedBtn = filtersContainer.querySelector('#filter-discussed');

let currentPhotos = [];

const getRandomPhotos = (photos) => {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (photos) => {
  return [...photos].sort((a, b) => b.comments.length - a.comments.length);
};

const clearThumbnails = () => {
  document.querySelectorAll('.picture').forEach((el) => el.remove());
};

const rerender = debounce((filteredPhotos) => {
  clearThumbnails();
  renderThumbnails(filteredPhotos);
}, RERENDER_DELAY);

const setFilter = (button, filteredPhotos) => {
  filtersContainer.querySelectorAll('.img-filters__button').forEach((btn) =>
    btn.classList.remove('img-filters__button--active')
  );
  button.classList.add('img-filters__button--active');
  rerender(filteredPhotos);
};

const initFilters = (photos) => {
  currentPhotos = photos;

  filtersContainer.classList.remove('img-filters--inactive');

  defaultBtn.addEventListener('click', () => {
    setFilter(defaultBtn, currentPhotos);
  });

  randomBtn.addEventListener('click', () => {
    setFilter(randomBtn, getRandomPhotos(currentPhotos));
  });

  discussedBtn.addEventListener('click', () => {
    setFilter(discussedBtn, getDiscussedPhotos(currentPhotos));
  });
};

export { initFilters };
