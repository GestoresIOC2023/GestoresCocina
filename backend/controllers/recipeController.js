import recipesModel from "../models/recipeModel.js";

const getRecipe = async (req, res) => {
  const recipe_id = req.params.recipe_id;

  try {
    const recipe = await recipesModel.getRecipe(recipe_id);
    return res.status(200).json({ recipe });
  } catch {
    res.status(500).send("Error al obtener la receta");
  }
};

const getRecipesSortedByDate = async (req, res) => {
  try {
    const recipes = await recipesModel.getRecipesSortedByDate();
    return res.status(200).json({ recipes });
  } catch {
    res.status(500).send("Error al obtener las recetas ordenadas por fecha");
  }
};

const getRecipesSortedByRating = async (req, res) => {
  try {
    const recipes = await recipesModel.getRecipesSortedByRating();
    return res.status(200).json({ recipes });
  } catch {
    res
      .status(500)
      .send("Error al obtener las recetas ordenadas por valoración");
  }
};

const deleteRecipe = async (req, res) => {
  const recipe_id = req.params.recipe_id;
  try {
    const recipe = await recipesModel.getRecipe(recipe_id);
    if (recipe.length === 0) {
      return res
        .status(404)
        .send(`No se puede encontrar la receta con el ID ${recipe_id}`);
    }
    await recipesModel.deleteRecipe(recipe_id);
    res.status(200).send(`Receta ${recipe_id} eliminada`);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error al eliminar la receta con el ID ${recipe_id}`);
  }
};

const postRecipe = async (req, res) => {
  let recipe = { ...req.body };
  console.log(recipe);
  if (req.file) {
    const photo = "http://localhost:5001/uploads/" + req.file.originalname;
    recipe = { ...recipe, url_image: photo };
  }
  try {
    await recipesModel.addNewRecipe(recipe);
    //res.json(recipe).status(200).send(`Receta creada`);
  } catch {
    console.log(`Error creando receta`);
    //res.status(500).send(`Error creando receta`)
  }
  res.json(recipe);
};

const getRecipeByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const recipes = await recipesModel.getRecipeByCategory(category);
    return res.status(200).json({ recipes });
  } catch {
    res.status(500).send("Error al obtener las recetas por categoria");
  }
};

const getRecipesByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const recipes = await recipesModel.getRecipesByUserId(userId);
    return res.status(200).json({ recipes });
  } catch {
    res.status(500).send("Error al obtener las recetas por categoria");
  }
};
const updateRecipe = async (req, res) => {
  try {
    let photo;
    let recipe = { ...req.body };
    //Si se ha subido la foto se guarda en la base de datos con la url de la photo
    //No se si la ruta se puede crear de otra manera en vez de un string.
    if (req.file) {
      photo = "http://localhost:5001/uploads/" + req.file.originalname;
      recipe = { ...recipe, url_image: photo };
    }
    const users = await recipesModel.updateRecipe(recipe);
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al actualizar datos del usuario");
  }
};

//Obtener ingredientes a partir del ID de una receta

const getIngredientsByRecipeId = async (req, res) => {
  const recipeId = req.params.recipe_id;
  try {
    const ingredients = await recipesModel.getIngredientsByRecipeId(recipeId);
    return res.status(200).json({ ingredients });
  } catch (error) {
    res.status(500).send("Error al obtener los ingredientes");
  }
};

const postShoppingList = async (req, res) => {
  const user_id = req.params.userid;
  const recipe_id = req.params.recipe_id;
  const ingredients = req.params.ingredients;
  try {
    const ingredientsList = await recipesModel.postShoppingList(
      user_id,
      recipe_id,
      ingredients
    );
    return res.status(200).json(ingredientsList);
  } catch (error) {
    res.status(500).send(`Error insertando ingredientes en la base de datos`);
  }
};
const getShoppingList = async (req, res) => {
  const user_id = req.params.userid;
  try {
    const list = await recipesModel.getShoppingList(user_id);
    return res.status(200).json(list);
  } catch (err) {
    throw Error(`Error obteniendo la lista ${err}`);
  }
};
const deleteShoppingList = async (req, res) => {
  const user_id = req.params.userid;
  try {
    await recipesModel.deleteShoppingList(user_id);
    return res.status(200).send("Lista borrada");
  } catch (err) {
    throw Error(`Error eliminando la lista ${err}`);
  }

  //Obtener puntuacion usuario
};
const getRatingByUserId = async (req, res) => {
  const user_id = req.params.user_id;
  const recipe_id = req.params.recipe_id;
  try {
    const rating = await recipesModel.getRatingByUserId(user_id, recipe_id);
    return res.status(200).json(rating);
  } catch (err) {
    throw Error("Error al obtener datos raiting");
  }
};
const postRating = async (req, res) => {
  const rating = req.body;
  try {
    const insertRating = await recipesModel.insertRating(rating);
    return res.status(200).json(insertRating);
  } catch (err) {
    throw Error("Error al obtener datos raiting");
  }
};
const putRating = async (req, res) => {
  const rating = req.body;
  try {
    const insertRating = await recipesModel.updateRating(rating);
    return res.status(200).json(insertRating);
  } catch (err) {
    throw Error("Error al obtener datos raiting");
  }
};
const deleteRating = async (req, res) => {
  const rating = req.body;
  try {
    const delRating = await recipesModel.deleteRating(rating);
    return res.status(200).json(delRating);
  } catch (err) {
    throw Error("Error al obtener datos raiting");
  }
};
const getRatingAverage = async (req, res) => {
  const rating = req.params.recipe_id;
  try {
    const delRating = await recipesModel.getRatingAverage(rating);
    return res.status(200).json(delRating);
  } catch (err) {
    throw Error("Error al obtener datos raiting");
  }
};

export default {
  getRecipe,
  postRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipesSortedByDate,
  getRecipesSortedByRating,
  getIngredientsByRecipeId,
  getRecipeByCategory,
  getRecipesByUserId,
  postShoppingList,
  getShoppingList,
  deleteShoppingList,
  getRatingByUserId,
  postRating,
  putRating,
  deleteRating,
  getRatingAverage,
};
