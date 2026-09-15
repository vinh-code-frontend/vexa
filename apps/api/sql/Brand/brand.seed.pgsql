-- Active: 1788621868315@@localhost@5432@VexaDb

-- Create
INSERT INTO "Brands"
    ("Name", "Slug", "Description", "IsActive", "DisplayOrder", "LogoUrl", "UpdatedAt")
VALUES
    ('Sample Brand', 'sample-brand', 'Sample brand description', true, 1, NULL, NULL);

-- Add sample brands
INSERT INTO "Brands"
    ("Name", "Slug", "Description", "IsActive", "DisplayOrder", "LogoUrl", "UpdatedAt")
SELECT
    'Brand' || i,
    'brand-' || i,
    'Description for brand ' || i,
    true,
    i,
    NULL,
    NULL
FROM generate_series(1, 10) AS i

-- Get All
SELECT * FROM "Brands" ORDER BY "CreatedAt" DESC;

-- Delete All
DELETE FROM "Brands";
