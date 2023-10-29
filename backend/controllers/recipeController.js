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
  console.log(req.body);
  let photo;
  let recipe = {
    title: req.body.title,
    time: parseInt(req.body.time),
    servings: parseInt(req.body.servings),
    url_image: req.body.url_image,
    instructions: req.body.instructions,
    user_id: req.body.user_id,
    vegetarian:req.body.vegetarian,
    glutenFree:req.body.glutenFree,
    dairyFree:req.body.dairyFree,
    veryHealthy:req.body.veryHealthy

  };
  if (req.file) {
    photo = "http://localhost:5001/uploads/" + req.file.originalname;
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

const getRecipeByCategory = async (req ,res) => {
  const category = req.params.category;
  try {
    const recipes = await recipesModel.getRecipeByCategory(category);
    return res.status(200).json({ recipes });
  } catch {
    res
      .status(500)
      .send("Error al obtener las recetas por categoria");
  }


}
// const upadteRecipe = (req, res) => {
//   const recipe = req.params.id;

// }


//Obtener ingredientes a partir del ID de una receta


const getIngredientsByRecipeId = async (req, res) => {
  const recipeId = req.params.recipe_id;
  try {
    const ingredients = await recipesModel.getIngredientsByRecipeId(recipeId);
    return res.status(200).json( {ingredients} );
  } catch (error) {
    res.status(500).send("Error al obtener los ingredientes");
  }
};

export default {
  getRecipe,
  postRecipe,
  deleteRecipe,
  //upadteRecipe,
  getRecipesSortedByDate,
  getRecipesSortedByRating,
  getIngredientsByRecipeId,
  getRecipeByCategory
};
