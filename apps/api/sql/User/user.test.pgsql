-- Active: 1788621868315@@localhost@5432@VexaDb

-- Get All
SELECT * FROM "Users" ORDER BY "CreatedAt" DESC;

-- Get by Ids
SELECT * FROM "Users"
WHERE "Id" = '1d7f7889-e6b5-4fd3-96ed-cc4a5d4af990' LIMIT 1;

-- Update by Id
UPDATE "Users"
SET
    "Username" = 'admin_new',
    "Email" = 'new@updated.vexa.com'
WHERE "Id" = '1d7f7889-e6b5-4fd3-96ed-cc4a5d4af990'

-- Delete by Ids
DELETE FROM "Users"
WHERE "Username" = 'x';
