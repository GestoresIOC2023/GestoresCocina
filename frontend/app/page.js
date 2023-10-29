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

  useEffect(() => {
    fetch('/api/v1/getRecipesSortedByDate')
      .then((response) => response.json())
      .then((data) => setRecipes(data.recipes));
  }, []);

  return (
    <>
     <Header />
     <Categories />
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
     
      <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 3, sm: 8, md: 12, xl:12 }}>
          {recipes.map((recipe, index) => (
            <Grid xs={3} sm={4} md={4} xl={4} key={recipe.id}>
                    {recipe && recipe.user && (
                  <CardWithGrowEffect recipe={recipe} index={index} />
                )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
    </>
  );

};

export default Home;