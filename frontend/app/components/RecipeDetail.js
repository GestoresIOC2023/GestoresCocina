import React from 'react';

const RecipeDetail = ({ recipeData }) => {
  console.log(recipeData)
  return (
    <div>
        <div>
            {recipeData.recipe ? <h1>{recipeData.recipe.title}</h1> : <h1></h1>}
        </div>
    </div>
  );
};

export default RecipeDetail;