import dotenv from "dotenv";
import mysqlPromise from "mysql2/promise";

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
  queueLimit: 0
});

const getUser = async (id) => {
  try {
    const [rows] = await db.execute("SELECT * FROM `user` WHERE user_id = ?;",
     [id]);
    return rows;
  } catch (err) {
      console.error("Error in getUsers:", err);
    throw new Error("Could not retrieve users from database");
  }
};
const createUser = async ({ user_id, email, nickname, profile_picture, updated_at}) => {
  const date = new Date(updated_at);
  updated_at = date.toISOString().slice(0, 19).replace('T', ' ')
  try {
    const [rows] = await db.execute(
      
      "INSERT INTO `user` (user_id, email, nickname, profile_picture, updated_at) VALUES(?,?,?,?,?);",
      [user_id, email, nickname, profile_picture, updated_at]
    );
    return rows;
  } catch (err) {
      console.error("Error in insertUsers:", err);
    throw new Error("Could not insert users from database");
  }
};

export default {
  getUser,
  createUser
};
