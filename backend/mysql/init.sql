-- MySQL database initialization
USE gestores;

CREATE TABLE IF NOT EXISTS users (
	id VARCHAR (50) PRIMARY KEY,
	email VARCHAR(50),
	nickname VARCHAR(50),
	update_at VARCHAR(50),
	picture VARCHAR(250),
);