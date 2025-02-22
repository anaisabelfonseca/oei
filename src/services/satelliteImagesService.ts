import db from '../db/db';
import type { SatelliteImageFilters as ImageFilters } from 'models/SatelliteImagesFilters.types';

// Fetch all satellite images with optional filters
export const getSatelliteImages = async (filters: ImageFilters) => {

  // ST_AsGeoJSON(geometry)::json AS geometry deconstructs the geometry binary
  let query = `
    SELECT 
        catalog_id, 
        image_name, 
        acquisition_start_date, 
        acquisition_end_date, 
        cloud_coverage, 
        scan_direction, 
        satellite_elevation, 
        resolution, 
        sensor, 
        image_bands, 
        ST_AsGeoJSON(geometry)::json AS geometry
    FROM satellite_images
    WHERE 1=1`;

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

  const result = await db.query(query, values);
  if(result.rowCount == 0) {
    return 0;
  }

  return result.rows;
};

// Fetch all satellite images with location filter
export const getFilteredSatelliteImages = async (geoJSON : any) => {

  const geoJSONString = JSON.stringify(geoJSON);

  let query = `
    SELECT 
        catalog_id, 
        image_name, 
        acquisition_start_date, 
        acquisition_end_date, 
        cloud_coverage, 
        scan_direction, 
        satellite_elevation, 
        resolution, 
        sensor, 
        image_bands, 
        ST_AsGeoJSON(geometry)::json AS geometry
    FROM satellite_images
    WHERE ST_Intersects(geometry, ST_GeomFromGeoJSON($1)::geometry)
  `;

  const result = await db.query(query, [geoJSONString]);

  if (result.rowCount === 0) {
    return [];
  }

  return result;
};


// Fetch a single image by ID
export const getImageById = async (catalogId: string) => {
  const result = await db.query('SELECT * FROM satellite_images WHERE catalog_id = $1', [catalogId]);
  return result.rows[0];
};
