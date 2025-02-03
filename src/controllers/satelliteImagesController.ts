import { Request, Response, NextFunction } from 'express';
import { getFilteredSatelliteImages, getSatelliteImages, getImageById } from '../services/satelliteImagesService';
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

export const getFilteredImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    const geoJSON = req.query.geoJSON as string; // Extract from query
    
    // Quick validation
    if (!geoJSON) {
      res.status(400).json({ error: "GeoJSON filter is required" });
      return;
    }
     // Parse with input validation
     let parsedGeoJSON;
     try {
       parsedGeoJSON = JSON.parse(decodeURIComponent(geoJSON));
     } catch (error) {
       res.status(400).json({ error: "Invalid GeoJSON format" });
       return;
     }

    const images = await getFilteredSatelliteImages(parsedGeoJSON);
    
    if (!images) {
      res.status(404).json({ error: "No images found for the given filter" });
      return;
    }

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