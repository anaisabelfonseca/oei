import express from 'express';
import { getAllImages, getFilteredImages, getImageDetails } from '../controllers/satelliteImagesController';

const router = express.Router();

router.get('/images', getAllImages);
router.get('/images/filter', getFilteredImages);
router.get('/images/:catalogId', getImageDetails);

export default router;