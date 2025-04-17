import {PHOTO_COUNT} from './data.js';
import {generatePhotoMeta} from './photos.js';

const photos = Array.from({ length: PHOTO_COUNT }, (_, i) => generatePhotoMeta(i + 1));
console.log(photos);
