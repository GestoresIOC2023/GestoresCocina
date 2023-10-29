'use client';
import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Categories from "@/app/components/Categories";
import LoadAllRecipes from "@/app/components/LoadAllRecipes";

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

          <Grid container spacing={{ xs: 3, md: 3 }} columns={{ xs: 3, sm: 8, md: 12, xl: 12 }}>
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
