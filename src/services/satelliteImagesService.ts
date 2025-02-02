import db from '../db/db';
import type { SatelliteImageFilters as ImageFilters } from 'models/SatelliteImagesFilters.types';

// Fetch all satellite images with optional filters
export const getSatelliteImages = async (filters: ImageFilters) => {
  let query = 'SELECT * FROM satellite_images WHERE 1=1';
  const values: any[] = [];

  // Filters date as: acquisition date equals or higher than input
  if (filters.acquisitionDate) {
    query += ' AND acquisition_start_date >= $1';
    values.push(filters.acquisitionDate);
  }

  if(filters.cloudCoverage) {
    query += ' AND cloud_coverage <= $1';
    values.push(filters.cloudCoverage);
  }

  if (filters.geoJSON) {
    query += ` AND ST_Intersects(geometry, ST_GeomFromGeoText(${values.length + 1}))`;
    values.push(JSON.stringify(filters.geoJSON));
  }

  const result = await db.query(query, values);
  if(result.rowCount == 0) {
    return 0;
  }
  return result.rows;
};

// Fetch a single image by ID
export const getImageById = async (catalogId: string) => {
  const result = await db.query('SELECT * FROM satellite_images WHERE catalog_id = $1', [catalogId]);
  return result.rows[0];
};
