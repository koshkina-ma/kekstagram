import { generatePhotos } from './photos.js';
import { renderThumbnails } from './ui.js';
import './uploadForm.js';


const photos = generatePhotos(25);
renderThumbnails(photos);


export { photos };
