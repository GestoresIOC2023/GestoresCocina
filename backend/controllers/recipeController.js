import recipesModel from '../models/recipeModel.js'


const getRecipe = async (req, res) => {
  const recipe_id = req.params.recipe_id;

  try {
    const recipe = await recipesModel.getRecipe(recipe_id);
    return res.status(200).json({ recipe });
  } catch {
    res.status(500).send("Error al obtener la receta");
  }
}

const getRecipesSortedByDate = async (req, res) => {
  try {
    const recipes = await recipesModel.getRecipesSortedByDate();
    return res.status(200).json({ recipes });
  } catch {
    res.status(500).send("Error al obtener las recetas ordenadas por fecha");
  }
}

const getRecipesSortedByRating = async (req, res) => {
  try {
    const recipes = await recipesModel.getRecipesSortedByRating();
    return res.status(200).json({ recipes });
  } catch {
    res.status(500).send("Error al obtener las recetas ordenadas por valoración");
  }
}

const deleteRecipe = async (req, res) => {
  const recipe_id = req.params.recipe_id; 
  try {
    const recipe = await recipesModel.getRecipe(recipe_id);
    console.log(recipe); 

    if (recipe.length === 0) { 
      return res.status(404).send(`No se puede encontrar la receta con el ID ${recipe_id}`);
    }

    await recipesModel.deleteRecipe(recipe_id); 
    res.status(200).send(`Receta ${recipe_id} eliminada`);
  } catch (error) { 
    console.log(error);
    res.status(500).send(`Error al eliminar la receta con el ID ${recipe_id}`);
  }
};


// const postRecipe = (req, res) => {

// }


// const upadteRecipe = (req, res) => {
//   const recipe = req.params.id;

// }

export default {
  getRecipe,
  //postRecipe,
  deleteRecipe,
  //upadteRecipe,
  getRecipesSortedByDate,
  getRecipesSortedByRating
}