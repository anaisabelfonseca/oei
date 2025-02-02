import express from 'express';
import { getAllImages, getImageDetails } from '../controllers/satelliteImagesController';

const router = express.Router();

router.get('/images', getAllImages);
router.get('/images/:catalogId', getImageDetails);

export default router;