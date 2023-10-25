import dotenv from "dotenv";
import mysqlPromise from "mysql2/promise";

// Load .env configuration
dotenv.config({ path: '../.env' })

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
const addNewRecipe = async (recipe) => {
  console.log(recipe)
  try {
    const [rows] = await db.execute("INSERT into `recipe` (title, cook_time, servings, recipe_picture, description, user_id) VALUES (?,?,?,?,?,?)",
      [recipe.title, recipe.time, recipe.servings, recipe.url_image, recipe.instructions, recipe.user_id]
    );
    return rows;
  } catch (err) {
    console.log("Error insertando recetas", err);
    throw new Error("Could not insert recipes on database");

  }

}

const closeDatabase = async () => {
  try {
    await db.end();
    console.log('Database pool cerrado');
  } catch (err) {
    console.log('Error cerrado el database pool', err);
  }
};

const deleteRecipe = async (id) =>{
  try {
    const [rows] = await db.execute("DELETE from `recipe` WHERE recipe_id = ? ",
    [id])
    return rows
  }catch (err) {
    console.error("Error borrando receta:", err);
    throw new Error(`No se puede eliminar la receta con id ${id}`);
  }
};

const getRecipe = async (id) => {
  try {
    const [rows] = await db.execute("SELECT * FROM `recipe` WHERE recipe_id = ?", [id]);
    if (rows.length === 0) {
      throw new Error(`No se puede encontrar la receta con id ${id}`);
    }
    return rows[0];
  } catch (err) {
    throw err;
  }
};

export default {
  getRecipesSortedByDate,
  getRecipesSortedByRating,
  addNewRecipe,
  closeDatabase,
  deleteRecipe,
  getRecipe
}