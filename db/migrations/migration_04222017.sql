-- \connect mbta_development

DROP TABLE tickets;
DROP TABLE users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT UNIQUE NOT NULL
);

CREATE TABLE tickets (
  id BIGSERIAL PRIMARY KEY,
  origin VARCHAR(1024),
  destination VARCHAR(1024),
  user_id INTEGER REFERENCES users(id)
);
