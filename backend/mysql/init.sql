-- MySQL database initialization
USE gestores;

CREATE TABLE IF NOT EXISTS users (
  id INT,
	name VARCHAR(50),
	job_title VARCHAR(50)
);
insert into users (id, name, job_title) values (2, 'Gerick', 'Quality Control Specialist');
insert into users (id, name, job_title) values (3, 'Davida', 'Social Worker');
insert into users (id, name, job_title) values (4, 'Junia', 'Marketing Manager');
insert into users (id, name, job_title) values (5, 'Ailene', 'Food Chemist');
insert into users (id, name, job_title) values (6, 'Marjorie', 'Senior Cost Accountant');
insert into users (id, name, job_title) values (7, 'Olvan', 'Senior Cost Accountant');
insert into users (id, name, job_title) values (8, 'Nady', 'Database Administrator II');
insert into users (id, name, job_title) values (9, 'Wilhelmine', 'Health Coach III');
insert into users (id, name, job_title) values (10, 'Nils', 'Pharmacist');
insert into users (id, name, job_title) values (11, 'Estefania', 'Boss');
insert into users (id, name, job_title) values (12, 'Titus', 'Research Assistant III');
insert into users (id, name, job_title) values (13, 'Ruprecht', 'Chief Design Engineer');
insert into users (id, name, job_title) values (14, 'Oswell', 'Compensation Analyst');
insert into users (id, name, job_title) values (15, 'Miguel', 'Boss');
insert into users (id, name, job_title) values (16, 'Ursulina', 'Nurse');
insert into users (id, name, job_title) values (17, 'Caspar', 'Design Engineer');
insert into users (id, name, job_title) values (18, 'Rora', 'Senior Financial Analyst');
insert into users (id, name, job_title) values (19, 'Ruben', 'Boss');
insert into users (id, name, job_title) values (20, 'Cathi', 'Physical Therapy Assistant');
