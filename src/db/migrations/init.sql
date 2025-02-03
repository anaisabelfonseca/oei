 -- Enable PostGIS extension
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto; -- For UUID gen


-- Create the satellite_images table with geometry support
-- I added a name for easier testing (image_name)
CREATE TABLE satellite_images (
    catalog_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_name VARCHAR(255),
    acquisition_start_date TIMESTAMP NOT NULL,
    acquisition_end_date TIMESTAMP NOT NULL,
    off_nadir FLOAT,
    resolution FLOAT,
    cloud_coverage FLOAT CHECK (cloud_coverage >= 0 AND cloud_coverage <= 100),
    sensor TEXT,
    scan_direction TEXT CHECK (scan_direction IN ('FORWARD', 'REVERSE')),
    satellite_elevation FLOAT CHECK (satellite_elevation >= 0 AND satellite_elevation <= 90),
    image_bands TEXT,
    geometry GEOMETRY(GEOMETRY, 4326)  -- Supports multiple geometry types (Point, Line, Polygon, etc.) - 4326 is a default SRID.
);

-- Create orders table with image key
CREATE TABLE orders (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    catalog_id UUID NOT NULL REFERENCES satellite_images(catalog_id),
    customer_name TEXT NOT NULL,
    order_date TIMESTAMP DEFAULT NOW()
);

