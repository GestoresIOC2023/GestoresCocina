import React from 'react';
import "../styles/recipeDetail.css";

const RecipeDetail = ({ recipeData, ingredients}) => {
  return (
    <div>
      <div className='info-general'>
        {recipeData.recipe && (
          <div className='info-img'>
            <img src={recipeData.recipe.recipe_picture} alt={recipeData.recipe.title} />
          </div>
        )}
        <div className='info-basic'>
          <div>
            {recipeData.recipe && <h1 className='name-recipe'>{recipeData.recipe.title}</h1>}
          </div>
          <div className='time-servings'>
            <div className='servings'>
              <img src='../cubiertos.png' />
              <p>{recipeData.recipe && <span >{recipeData.recipe.servings}</span>} raciones</p>
            </div>
            <div className='time'>
              <img src='../reloj.png' />
              <p>{recipeData.recipe && <span >{recipeData.recipe.cook_time}</span>}  min</p>
            </div>
          </div>
        </div>
      </div>
      <div className='ingredients-preparation'>
        <div className='ingredients'>
          <h2 className='name-ig-pr'>INGREDIENTES   </h2>
          <ul className='name-ig'>
            {ingredients && ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.quantity} de {ingredient.ingredient_name} </li>
            ))}
          </ul>
        </div>
        <div className='preparation'>
          <h2 className='name-ig-pr'>PREPARACIÓN</h2>
          <p className='preparation-data'>{recipeData.recipe && <span >{recipeData.recipe.description}</span>}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
