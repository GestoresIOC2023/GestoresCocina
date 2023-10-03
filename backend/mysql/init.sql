-- MySQL database initialization
USE gestores;

CREATE TABLE IF NOT EXISTS users (
  id PRIMARY KEY,
	email VARCHAR(50),
	passwd VARCHAR(50),
);


