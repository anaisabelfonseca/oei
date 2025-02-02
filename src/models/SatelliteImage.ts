export interface SatelliteImage {
    catalog_id: string;
    image_name: string;
    acquisition_start_date: string;
    acquisition_end_date: string;
    cloud_coverage: number;
    scan_direction: string;
    satellite_elevation: number;
    resolution: number;
    sensor: string;
    image_bands: string;
    geometry: {
      type: string;
      coordinates: number[][][];
    };
}