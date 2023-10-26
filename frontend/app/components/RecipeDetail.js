import React from 'react';

const RecipeDetail = ({ recipeData }) => {
  return (
    <div>
        <div>
            {recipeData.recipe ? <h1>{recipeData.recipe.title}</h1> : <h1></h1>}
        </div>
    </div>
  );
};

export default RecipeDetail;