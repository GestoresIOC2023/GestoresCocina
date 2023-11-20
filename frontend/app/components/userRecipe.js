"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { CardActionArea } from "@mui/material";

export default function RecipesUser({
  user_id,
  handleSetRecipe,
  handleSetTab,
}) {
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    const getRecipes = async () => {
      await fetch(
        "http://localhost:5001/api/v1/recipesByUserId/" + user_id
      ).then((response) =>
        response.json().then((data) => {
          setRecipes(data.recipes);
        })
      );
    };
    getRecipes();
  }, []);

  const deleteRecipe = async (recipeId) => {
    const response = await fetch(
      "http://localhost:5001/api/v1/recipes/" + recipeId,
      {
        method: "DELETE",
      }
    );
    if (response.status == 200) {
      await fetch(
        "http://localhost:5001/api/v1/recipesByUserId/" + user_id
      ).then((response) =>
        response.json().then((data) => {
          setRecipes(data.recipes);
        })
      );
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {recipes &&
        recipes.map((recipe) => (
          <Card
            key={recipe.recipe_id}
            variant="outlined"
            sx={{ display: "flex", gap: "", height:"100px" }}
          >
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={recipe.recipe_picture}
              alt="Live from space album cover"
            />
            <Box sx={{ display: "flex", width: "100%" }}>
              <CardActionArea href={`/recipe/${recipe.recipe_id}`}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h6">
                    {recipe.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  pl: 1,
                  pb: 1,
                }}
              >
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    handleSetRecipe(recipe);
                    handleSetTab(2);
                  }}
                >
                  <Edit></Edit>
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteRecipe(recipe.recipe_id)}
                >
                  <Delete></Delete>
                </IconButton>
              </Box>
            </Box>
          </Card>
        ))}
    </Box>
  );
}
