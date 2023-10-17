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
  queueLimit: 0,
});
//devuelve usuario a traves de su id
const getUser = async (id) => {
  try {
    const [rows] = await db.execute("SELECT * FROM `user` WHERE user_id = ?;", [
      id,
    ]);
    return rows;
  } catch (err) {
    console.error("Error in getUsers:", err);
    throw new Error("Could not retrieve users from database");
  }
};
//inserta un nuevo usuario en la base de datos
const createUser = async ({
  user_id,
  email,
  nickname,
  profile_picture,
  updated_at,
}) => {
  const date = new Date(updated_at);
  updated_at = date.toISOString().slice(0, 19).replace("T", " ");
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
//Actualiza al usuario
const updateUser = async ({ user_id, nickname, profile_picture }) => {
  const date = new Date();
  const updated_at = date.toISOString().slice(0, 19).replace("T", " ");
  try {
    const values = profile_picture
      ? [nickname, profile_picture, updated_at, user_id]
      : [nickname, updated_at, user_id];
    const [rows] = await db.execute(
      `UPDATE user SET nickname = ?, ${profile_picture ? "profile_picture = ?," : ""} updated_at = ? WHERE user_id = ?;`,
      values
    );
    return rows;
  } catch (err) {
    console.error("Error in updateUser:", err);
    throw new Error("Could not update user in the database");
  }
};

export default {
  getUser,
  createUser,
  updateUser,
};
