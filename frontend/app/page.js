'use client';
import React, { useState, useEffect } from "react";
import RecipeReviewCard from "@/app/components/RecipeReviewCard";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Grow from '@mui/material/Grow';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from "@/app/components/Header";
import Categories from "@/app/components/Categories";

function CardWithGrowEffect({ recipe, index }) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const delay = index * 200;
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Grow in={isLoaded} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <div>
        <RecipeReviewCard
          id={recipe.recipe_id}
          title={recipe.title}
          img={recipe.recipe_picture}
          desc={recipe.description}
          updated={recipe.updated_at}
          recipeDetailUrl={`/recipe/${recipe.recipe_id}`}
          //categorias
          vegetarian={recipe.vegetarian}
          glutenFree={recipe.glutenFree}
          dairyFree={recipe.dairyFree}
          veryHealthy={recipe.veryHealthy}
        />
      </div>
    </Grow>
  );
}

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    let url = '/api/v1/getRecipesSortedByDate';

    if (selectedCategory) {
      url = `/api/v1/recipesByCat/${selectedCategory}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipes));
  }, [selectedCategory]);

  function categorySelected(category) {
    setSelectedCategory(category);
  }

  return (
    <>
      <Header />
      <Categories sel={categorySelected} />
      <LoadAllRecipes recipes={recipes} />
    </>
  );

};

export default Home;