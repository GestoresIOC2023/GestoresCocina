import recipesModel from '../models/recipeModel.js'
import { argv } from 'node:process';

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
        recipes.push({
          user_id: userID,
          recipe_id: data.recipes[0].recipe_id,
          title: data.recipes[0].title,
          time: data.recipes[0].readyInMinutes,
          servings: data.recipes[0].servings,
          url_image: data.recipes[0].image,
          summary: data.recipes[0].summary,
          instructions: data.recipes[0].instructions,
          category: data.recipes[0].diets,
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
    try{
      await recipesModel.addNewRecipes(newRecipe); 
      console.log(`Creada receta: ${newRecipe.title} `)
    }catch{
      console.log (`Error creando receta`)    
    }
  }
  
};

const numberOfRecipes = argv[2]
const userID =argv[3]
await addNewRecipes(numberOfRecipes, userID);
await recipesModel.closeDatabase();