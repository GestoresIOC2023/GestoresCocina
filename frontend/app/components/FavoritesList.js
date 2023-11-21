import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveFavoriteModal from "./RemoveFavoriteModal";

const FavoritesList = ({ userId, onClick }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/v1/recipe/favorites/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Datos de recetas favoritas:", data);

        if (data && data.length > 0) {
          setFavorites(data);
        } else {
          console.warn("La respuesta de recetas favoritas está vacía");
        }
      } else {
        console.error("Error al obtener la lista de favoritos");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error al obtener la lista de favoritos", error);
      setLoading(false);
    }
  };

  const handleOpenModal = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRecipeId(null);
    setOpenModal(false);
  };

  const handleConfirmRemoveFavorite = () => {
    handleRemoveFavorite(selectedRecipeId);
    handleCloseModal();
  };

  const handleRemoveFavorite = async (recipeId) => {
    try {
      setFavorites((prevFavorites) =>
        prevFavorites.filter(
          (favorite) => favorite.recipe_id !== recipeId
        )
      );
      const response = await fetch(`/api/v1/recipes/${userId}/${recipeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Receta eliminada de favoritos correctamente.");
      } else {
        console.error("Error al eliminar la receta de favoritos.");
        fetchFavorites();
      }
    } catch (error) {
      console.error("Error al eliminar la receta de favoritos", error);
    }
  };

  useEffect(() => {
    if (onClick) {
      fetchFavorites();
    }
  }, [userId, onClick]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {favorites.map((favorite) => (
        <Card
          key={favorite.recipe_id}
          variant="outlined"
          sx={{ display: "flex", gap: "", height: "100px" }}
        >
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={favorite.recipe_picture}
            alt="Live from space album cover"
          />
          <Box sx={{ display: "flex", width: "100%" }}>
            <CardActionArea href={`/recipe/${favorite.recipe_id}`}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h6">
                  {favorite.title}
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
                aria-label="favorite"
                onClick={() => handleOpenModal(favorite.recipe_id)}
                sx={{
                  color: "#FF6724",
                  "&:hover": {
                    color: "black",
                  },
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </Box>
          </Box>
        </Card>
      ))}
      <RemoveFavoriteModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmRemoveFavorite}
      />
    </Box>
  );
};

export default FavoritesList;