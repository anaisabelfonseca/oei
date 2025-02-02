import { Request, Response, NextFunction } from 'express';
import { getSatelliteImages, getImageById } from '../services/satelliteImagesService';
import { SatelliteImageFilters } from '../models/SatelliteImagesFilters.types';

export const getAllImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters: SatelliteImageFilters = req.query;
    const images = await getSatelliteImages(filters);
    res.json(images);
  } catch (error) {
    next(error);
  }
};

export const getImageDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const image = await getImageById(req.params.catalogId);
      if (!image) {
          res.status(404).json({ message: "Image not found" });
          return;
      }
      res.json(image);
  } catch (error) {
      next(error);
  }
};