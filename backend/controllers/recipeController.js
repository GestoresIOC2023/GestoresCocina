

const getRecipe  = (req,res) => {
  const recipe = req.params.id;
  res.send ("You have got a recipe" + recipe)

}

const getRecipesSortedByDate = (req, res) => {

}

const getRecipesSortedByRating = (req, res) => {

}
const postRecipe = (req, res) => {

}

const deleteRecipe = (req, res) => {
  const recipe = req.params.id;

}

const upadteRecipe = (req, res) => {
  const recipe = req.params.id;

}



export default {
  getRecipe,
  postRecipe,
  deleteRecipe,
  upadteRecipe,
  getRecipesSortedByDate,
  getRecipesSortedByRating
}