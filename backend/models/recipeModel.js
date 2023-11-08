import dotenv from "dotenv";
import mysqlPromise from "mysql2/promise";

// Load .env configuration
dotenv.config({ path: "../.env" });

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
    const [rows] = await db.execute(
      "SELECT * FROM `recipe` ORDER BY `updated_at` DESC;"
    );
    return rows;
  } catch (err) {
    console.error("Error in getRecipesSortedByDate:", err);
    throw new Error("Could not retrieve recipes from database");
  }
};

const getRecipesByUserId = async (userId) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM `recipe` WHERE `user_id` = ?;",
      [userId]
    );
    return rows;
  } catch (err) {
    console.error("Error in getRecipesSortedByDate:", err);
    throw new Error("Could not retrieve recipes from database");
  }
};

const getRecipesSortedByRating = async () => {
  try {
    const [rows] = await db.execute(
      "SELECT `rating, recipe_id` FROM `rating` WHERE `recipe_id` IN (SELECT `recipe_id` FROM `recipe`);"
    );
    return rows;
  } catch (err) {
    console.error("Error in getRecipesSortedByDate:", err);
    throw new Error("Could not retrieve recipes from database");
  }
};
const addNewRecipe = async (recipe) => {
  const conec = await db.getConnection();
  console.log(recipe);
  try {
    await conec.beginTransaction();
    const ingredients = JSON.parse(recipe.ingredients);
    const [recipesRows] = await conec.execute("INSERT into `recipe` (title, cook_time, servings, recipe_picture, description, user_id, vegetarian, glutenFree,dairyFree,veryHealthy) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [recipe.title, recipe.time, recipe.servings, recipe.url_image, recipe.description, recipe.user_id, recipe.vegetarian, recipe.glutenFree, recipe.dairyFree, recipe.veryHealthy]
    );
    const insertedId = recipesRows.insertId;
    for (let i = 0; i < ingredients.length; i++) {
      const [ingRows] = await conec.execute(
        "INSERT INTO ingredient (ingredient_name) VALUES (?)",
        [ingredients[i].ingredient_name]
      );
      const insertedIngId = ingRows.insertId;
      const quantity = ingredients[i].quantity;
      await conec.execute(
        "INSERT INTO recipe_ingredient  (recipe_id, ingredient_id, quantity) VALUES (?,?,?)",
        [insertedId, insertedIngId, quantity]
      );
      console.log(quantity);
    }
    await conec.commit();
  } catch (err) {
    console.log(err);
    conec.rollback();
    console.log("Error insertando recetas", err);
    throw new Error("Could not insert recipes on database");
  }
};

const updateRecipe = async (recipe) => {
  const date = new Date();
  const updated_at = date.toISOString().slice(0, 19).replace("T", " ");
  const conec = await db.getConnection();
  try {
    await conec.beginTransaction();
    const ingredients = JSON.parse(recipe.ingredients);
    const oldIngredients = JSON.parse(recipe.oldIngredients);
    const [rows] = await db.execute(
      `UPDATE recipe SET title=?, cook_time=?, servings=?, recipe_picture=?, description=?, vegetarian=?, glutenFree=? , dairyFree=?, veryHealthy=?, updated_at=? WHERE recipe_id=?;`,
      [
        recipe.title,
        recipe.time,
        recipe.servings,
        recipe.url_image,
        recipe.description,
        recipe.vegetarian,
        recipe.glutenFree,
        recipe.dairyFree,
        recipe.veryHealthy,
        updated_at,
        recipe.recipe_id,
      ]
    );
    console.log(oldIngredients);
    for (let i = 0; i < oldIngredients.length; i++) {
      await conec.execute("DELETE from `ingredient` WHERE ingredient_id=? ", [
        oldIngredients[i].ingredient_id,
      ]);
    }
    for (let i = 0; i < ingredients.length; i++) {
      const [ingRows] = await conec.execute(
        "INSERT INTO ingredient (ingredient_name) VALUES (?)",
        [ingredients[i].ingredient_name]
      );
      const insertedIngId = ingRows.insertId;
      const quantity = ingredients[i].quantity;
      await conec.execute(
        "INSERT INTO recipe_ingredient  (recipe_id, ingredient_id, quantity) VALUES (?,?,?)",
        [recipe.recipe_id, insertedIngId, quantity]
      );
    }
    console.log("actualizado todo");
    await conec.commit();

    return rows;
  } catch (err) {
    await conec.rollback();
    console.error("Error in updateRecipe:", err);
    throw new Error("Could not update recipe in the database");
  }
};

const closeDatabase = async () => {
  try {
    await db.end();
    console.log("Database pool cerrado");
  } catch (err) {
    console.log("Error cerrado el database pool", err);
  }
};

const deleteRecipe = async (id) => {
  try {
    await db.execute(
      "DELETE from `recipe_ingredient` WHERE recipe_id = ? ",
      [id]
    );
    
    
    await db.execute(
      "DELETE from `recipe` WHERE recipe_id = ? ",
      [id]
    );
    }catch (err){
    console.error("Error borrando receta:", err);
    throw new Error(`No se puede eliminar la receta con id ${id}`);
  }
};

const getRecipe = async (id) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM `recipe` WHERE recipe_id = ?",
      [id]
    );
    if (rows.length === 0) {
      throw new Error(`No se puede encontrar la receta con id ${id}`);
    }
    return rows[0];
  } catch (err) {
    throw err;
  }
};

const getRecipeByCategory = async (category) => {
  const allowedCategories = [
    "veryHealthy",
    "vegetarian",
    "dairyFree",
    "glutenFree",
  ];

  if (!allowedCategories.includes(category)) {
    throw new Error("Categoría no permitida");
  }

  try {
    const query = `SELECT * FROM recipe WHERE ${category} = 1`;
    const [rows] = await db.execute(query);
    return rows;
  } catch (err) {
    throw err;
  }
};

const getIngredientsByRecipeId = async (id) => {
  try {
    const [rows] = await db.execute(
      "SELECT ri.ingredient_id, ingredient_name, quantity FROM recipe_ingredient ri JOIN ingredient i ON ri.ingredient_id = i.ingredient_id  WHERE ri.recipe_id = ?",
      [id]
    );

    if (rows.length === 0) {
      throw new Error(
        `No se puede encontrar los ingrediente de la receta con id ${id}`
      );
    }
    return rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createRandomRecipe = async (recipe) => {
  try {
    const [recipesRows] = await db.execute(
      "INSERT into `recipe` (title, cook_time, servings, recipe_picture, description, user_id, vegetarian, glutenFree,dairyFree,veryHealthy) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        recipe.title,
        recipe.time,
        recipe.servings,
        recipe.url_image,
        recipe.instructions,
        recipe.user_id,
        recipe.vegetarian,
        recipe.glutenFree,
        recipe.dairyFree,
        recipe.veryHealthy,
      ]
    );
    const insertedId = recipesRows.insertId;
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const [ingRows] = await db.execute(
        "INSERT INTO ingredient (ingredient_name) VALUES (?)",
        [recipe.ingredients[i].ingredientName]
      );
      const insertedIngId = ingRows.insertId;
      const amount = recipe.ingredients[i].amount + recipe.ingredients[i].unit;
      await db.execute(
        "INSERT INTO recipe_ingredient  (recipe_id, ingredient_id, quantity) VALUES (?,?,?)",
        [insertedId, insertedIngId, amount]
      );
    }
  } catch (err) {
    console.log("Error insertando recetas", err);
    throw new Error("Could not insert recipes on database");
  }
};

export default {
  getRecipesSortedByDate,
  getRecipesSortedByRating,
  addNewRecipe,
  closeDatabase,
  deleteRecipe,
  getRecipe,
  getRecipeByCategory,
  getIngredientsByRecipeId,
  createRandomRecipe,
  getRecipesByUserId,
  updateRecipe,
};
