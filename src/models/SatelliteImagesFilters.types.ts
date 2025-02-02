export interface SatelliteImageFilters {
    acquisitionDate?: string; // ISO date string (YYYY-MM-DD)
    cloudCoverage?: number; // 0 to 100
    geoJSON?: any; // GeoJSON object for area filtering
  }