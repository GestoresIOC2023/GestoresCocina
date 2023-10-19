import React, { useState, useEffect } from "react";
import RecipeReviewCard from "@/app/components/RecipeReviewCard"
import '../public/styles.css'
function createCard(recipe) {
  return (
    <RecipeReviewCard
      key={recipe.recipe_id}
      title={recipe.title}
      img={recipe.recipe_picture}
      desc={recipe.description}
      updated={recipe.updated_at}
    />
  );
}
const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/v1/getRecipesSortedByDate')
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipes));
  }, []);

  return (
    <div>
      <h1>Lista de Recetas</h1>
      <div className="card-container">
  {recipes.map((recipe, key) => (
    <div key={key} className="individual-card-container">
      {createCard(recipe)}
    </div>
  ))}
</div>

    </div>
  );
};

export default Recipes;