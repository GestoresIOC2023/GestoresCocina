

const getRecipe  = (req,res) => {
  const recipe = req.params.id;
  res.send ("You have got a recipe" + recipe)

}

export default {
  getRecipe
}