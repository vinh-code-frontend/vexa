-- Active: 1788621868315@@localhost@5432@VexaDb

-- Get All
SELECT * FROM "Brands" ORDER BY "CreatedAt" DESC;

-- Get by Id
SELECT * FROM "Brands"
WHERE "Id" = 1 LIMIT 1;

-- Update by Id
UPDATE "Brands"
SET
    "Name" = 'Brand Updated',
    "Slug" = 'brand-updated'
WHERE "Id" = 1

-- Delete by Id
DELETE FROM "Brands"
WHERE "Id" = 1;
