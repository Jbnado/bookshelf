CREATE TABLE IF NOT EXISTS "Books" (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publisher VARCHAR(255) NOT NULL,
  genre VARCHAR(255),
  description TEXT,
  isbn VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "Users" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Reading" (
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES "Users"(id),
  bookId INTEGER REFERENCES "Books"(id),
  rating INTEGER,
  startedAt TIMESTAMP,
  finishedAt TIMESTAMP
);
