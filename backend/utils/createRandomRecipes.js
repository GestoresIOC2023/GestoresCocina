import recipesModel from '../models/recipeModel.js'
import { argv } from 'node:process';

class Recipe {
  constructor(userID, data) {
    this.user_id = userID;
    this.recipe_id = data.recipes[0].recipe_id;
    this.title = data.recipes[0].title;
    this.time = data.recipes[0].readyInMinutes;
    this.servings = data.recipes[0].servings;
    this.url_image = data.recipes[0].image;
    this.summary = data.recipes[0].summary;
    this.instructions = data.recipes[0].instructions;
    this.vegetarian = data.recipes[0].vegetarian;
    this.glutenFree = data.recipes[0].glutenFree;
    this.dairyFree = data.recipes[0].dairyFree;
    this.veryHealthy = data.recipes[0].veryHealthy;
    this.ingredients = data.recipes[0].extendedIngredients.map((ingredient) => {
      return {
        id: ingredient.id,
        ingredientName: ingredient.name,
        unit: ingredient.measures.metric.unitShort,
        amount: ingredient.measures.metric.amount
      };
    });
  }
  getRecipeTitle() {
    return this.title;
  }
}



const addNewRecipes = async (numberOfRecipes, userID) => {
  /*permite crear crear hasta 150 receptas por dia
  Cogemos los datos de una API que tiene ese limite.
  Instrucciones: npm run createRecipes numero_recetas user_id
  */
  let recipes = [];
  let fetchPromises = [];
  for (let cont = 0; cont < numberOfRecipes; cont++) {
    const fetchPromise = fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPON_API}`)
      .then(response => response.json())
      .then(data => {
        recipes.push(new Recipe (userID, data));
      })
      .catch(error => {
        console.error(`Error fetching data:${error}`);
      });
    fetchPromises.push(fetchPromise);
  }
  try {
    await Promise.all(fetchPromises);
  } catch (err) {
    console.log('Error in fetching: ', err);
  }

  for (const newRecipe of recipes) {
    try {
      await recipesModel.createRandomRecipe(newRecipe);
      console.log(`Receta creada: ${newRecipe.getRecipeTitle()}`)
    } catch {
      console.log(`Error creando receta`)
    }
  }

};

const numberOfRecipes = argv[2]
const userID = argv[3]
await addNewRecipes(numberOfRecipes, userID);
await recipesModel.closeDatabase();