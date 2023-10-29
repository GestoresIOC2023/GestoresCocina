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
      <LoadAllRecipes recipes={recipes} />
    </>
  );

};

export default Home;
