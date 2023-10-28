'use client';
import React, { useState, useEffect } from "react";
import RecipeReviewCard from "@/app/components/RecipeReviewCard"
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

function createCard(recipe) {
  return (
    <RecipeReviewCard
      id={recipe.recipe_id}
      title={recipe.title}
      img={recipe.recipe_picture}
      desc={recipe.description}
      updated={recipe.updated_at}
      recipeDetailUrl={`/recipe/${recipe.recipe_id}`}
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
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {recipes.map((recipe) => (
          <Grid xs={3} sm={4} md={4} key={recipe.id}>
           {createCard(recipe)}
          </Grid>
        ))}
      </Grid>
    </div>

  );
};

export default Recipes;

