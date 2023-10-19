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

const addNewRecipes = async (req, res) => {
  /* Solo para DEV. Esta funcion permite crear crear hasta 150 receptas por dia
  Cogemos los datos de una API que tiene ese limite.
  */
  let recipes = [];
  let fetchPromises = [];
  for (let numberOfRecipes = 0; numberOfRecipes < 20; numberOfRecipes++) {
    const fetchPromise = fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPON_API}`)
      .then(response => response.json())
      .then(data => {
        recipes.push({
          recipe_id: data.recipes[0].recipe_id,
          title: data.recipes[0].title,
          time: data.recipes[0].readyInMinutes,
          servings: data.recipes[0].servings,
          url_image: data.recipes[0].image,
          summary: data.recipes[0].summary,
          instructions: data.recipes[0].instructions,
          category: data.recipes[0].diets, // Asegúrate de que 'diets' es el campo correcto
          ingredients: data.recipes[0].extendedIngredients.map((ingredient) => {
            return {
              id: ingredient.id,
              ingrediente_name: ingredient.name,
              unit: ingredient.unit,
              amount: ingredient.amount
            };
          })
        });
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
    fetchPromises.push(fetchPromise);
  }
  await Promise.all(fetchPromises);
  res.json(recipes);
  for (const newRecipe of recipes) {
    await recipesModel.addNewRecipes(newRecipe); 
  }
};



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
  getRecipesSortedByRating,
  addNewRecipes
}