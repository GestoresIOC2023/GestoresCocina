'use client';
import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Categories from "@/app/components/Categories";
import LoadAllRecipes from "@/app/components/LoadAllRecipes";

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