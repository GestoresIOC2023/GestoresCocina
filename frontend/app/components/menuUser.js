"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CreateRecipe from "./createRecipe";
import UserPage from "./user";
import { Container } from "@mui/material";
import RecipesUser from "./userRecipe";
import { useState, useEffect } from "react";
import UpdateRecipe from "./updateRecipe";
import CheckboxList from './CheckboxList';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function MenuUser({ users }) {
  const [value, setValue] = useState(0);
  const [recipeUpdate, setRecipeUpdate] = useState();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    //guardamos el id del user en la sessionStorage
    if (users && users.length > 0 && users[0].user_id) {
      sessionStorage.setItem('user_id', users[0].user_id);
    }
  }, [users]); 
  
  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      setRecipeUpdate(null);
    }
    setValue(newValue);

  };
  const handleSetTab = (tab) => {
    setValue(tab);
  };
  const handleSetRecipe = (recipe) => {
    setRecipeUpdate(recipe);
  };
  const handleOnClick = async () => {
    const user_id = users[0].user_id;
    if (!user_id) {
      console.log('User ID no disponible.');
      return;
    }
    try {
      const response = await fetch(`/api/v1/recipe/getShoppingList/${user_id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const listOfIngredients = data.map((ing) => ing.ingredient);
      setIngredients(listOfIngredients);
    } catch (error) {
      console.error('Error obteniendo ingredientes', error);
    }
  };

  return (
    <Container className="flex-1" maxWidth="xl">
      <div className="grid grid-cols-3 min-h-full">
        <div className="col-span-1 bg-[#F6E9E0] py-20">
          <UserPage {...users[0]} />
        </div>
        <div
          className="col-span-2"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tabs
            className="bg-[#FF6724]"
            sx={{ color: "white" }}
            value={value}
            onChange={handleChange}
            centered
            variant="fullWidth"
            TabIndicatorProps={{ style: { backgroundColor: "black" } }}
          >
            <Tab
              sx={{
                color: "white",
                "&.Mui-selected": { color: "black" },
              }}
              label="Mis recetas"
            />
            <Tab
              sx={{
                color: "white",
                "&.Mui-selected": { color: "black" },
              }}
              label="Recetas favoritas"
            />
            <Tab
              sx={{
                "&:focus": { color: "black" },
                color: "white",
                "&.Mui-selected": { color: "black" },
              }}
              label={recipeUpdate ? "Actualizar receta" : "Añadir receta"}
            />
            <Tab
              onClick={() => handleOnClick()}
              sx={{
                color: "white",
                "&.Mui-selected": { color: "black" },
              }}
              label="Lista de la compra"
            />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <RecipesUser
              handleSetTab={handleSetTab}
              handleSetRecipe={handleSetRecipe}
              {...users[0]}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}></CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {recipeUpdate ? (
              <UpdateRecipe
                handleSetRecipe={handleSetRecipe}
                handleSetTab={handleSetTab}
                recipeUpdate={recipeUpdate}
                {...users[0]}
              />
            ) : (
              <CreateRecipe handleSetTab={handleSetTab} {...users[0]} />
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <CheckboxList ingredientes={ingredients}/>
          </CustomTabPanel>
        </div>
      </div>
    </Container>
  );
}
