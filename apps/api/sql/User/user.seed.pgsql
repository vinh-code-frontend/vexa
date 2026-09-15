-- Active: 1788621868315@@localhost@5432@VexaDb

-- Create
INSERT INTO "Users"
    ("Id", "Username", "Email", "HashedPassword", "Phone", "Role", "Status", "UpdatedAt")
VALUES
    (gen_random_uuid(), 'Sample', 'sample@vexa.test.com', 'NotWorkPassword', '0123456789', 1, 1, NULL);

-- Add sample admins
INSERT INTO "Users"
    ("Id", "Username", "Email", "HashedPassword", "Phone", "Role", "Status", "UpdatedAt")
SELECT
    gen_random_uuid(),
    'Admin' || i,
    'admin' || i || '@vexa.test.com',
    'NotWorkPassword',
    '012345' || lpad(i::text, 4, '0'),
    1,
    1,
    NULL
FROM generate_series(1, 10) AS i

-- Add sample users
INSERT INTO "Users"
    ("Id", "Username", "Email", "HashedPassword", "Phone", "Role", "Status", "UpdatedAt")
SELECT
    gen_random_uuid(),
    'User' || i,
    'user' || i || '@vexa.test.com',
    'NotWorkPassword',
    '012345' || lpad(i::text, 4, '0'),
    0,
    1,
    NULL
FROM generate_series(1, 10) AS i

-- Get All
SELECT * FROM "Users" ORDER BY "CreatedAt" DESC;

-- Delete All except admin
DELETE FROM "Users"
WHERE "Username" <> 'admin';
