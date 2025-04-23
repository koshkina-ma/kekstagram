import { generatePhotos } from './photos.js';
import { renderThumbnails } from './ui.js';

const photos = generatePhotos(25);
renderThumbnails(photos);

export { photos };
