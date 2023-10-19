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

const getRecipesSortedByDate = async () => {
  try {
    const [rows] = await db.execute("SELECT * FROM `recipe` ORDER BY `updated_at`;");
    return rows;
  } catch (err) {
    console.error("Error in getRecipesSortedByDate:", err);
    throw new Error("Could not retrieve recipes from database");
  }
};

const getRecipesSortedByRating = async () => {
  try {
    const [rows] = await db.execute("SELECT `rating, recipe_id` FROM `rating` WHERE `recipe_id` IN (SELECT `recipe_id` FROM `recipe`);");
    return rows;
  } catch (err) {
    console.error("Error in getRecipesSortedByDate:", err);
    throw new Error("Could not retrieve recipes from database");
  }
};

export default {
  getRecipesSortedByDate,
  getRecipesSortedByRating
}