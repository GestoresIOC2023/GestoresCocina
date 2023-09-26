import dotenv from 'dotenv';
import mysqlPromise from 'mysql2/promise';

// Load .env configuration
dotenv.config();

const db = mysqlPromise.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const getBossUsers = async (jobTitle) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM `users` WHERE job_title = ?;',
      [jobTitle]
    );
    return rows;
  } catch (err) {
    console.error('Error in getBossUsers:', err);
    throw new Error('Could not retrieve boss users from database');
  }
};

export default {
  getBossUsers
};
