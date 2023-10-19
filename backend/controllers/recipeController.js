import recipesModel from '../models/recipeModel.js'

const getRecipe = (req, res) => {
  const recipe = req.params.id;
  res.send("You have got a recipe" + recipe)

}

const getRecipesSortedByDate = async (req, res) => {
  try {
    const recipes = await recipesModel.getRecipesSortedByDate();
    //const recipes = {nombre: "espagueties"}
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
// const postRecipe = (req, res) => {

// }

// const deleteRecipe = (req, res) => {
//   const recipe = req.params.id;

// }

// const upadteRecipe = (req, res) => {
//   const recipe = req.params.id;

// }



export default {
  getRecipe,
  //postRecipe,
  //deleteRecipe,
  //upadteRecipe,
  getRecipesSortedByDate,
  getRecipesSortedByRating
}