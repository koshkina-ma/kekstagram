/* eslint-disable */

import './uploadForm.js';
import { getData } from './api.js';
import { renderThumbnails } from './ui.js';
import { showErrorMessage } from './error-message.js';
import { initFilters } from './filters.js';



getData()
  .then((photos) => {
    renderThumbnails(photos);
    initFilters(photos);
  })
  .catch(() => {
    showErrorMessage();
  });
