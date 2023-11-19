import React from "react";
import { useState, useEffect } from "react";

const AddToFavoritesButton = ({ recipeId, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch(`/api/v1/recipe/favorites/${userId}`);
        if (response.ok) {
          const data = await response.json();
          const recipeIsFavorite = data.some(
            (favoriteRecipe) => favoriteRecipe.recipe_id === recipeId
          );
          setIsFavorite(recipeIsFavorite);
        } else {
          console.error("Error al verificar el estado favorito");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al verificar el estado favorito", error);
        setLoading(false);
      }
    };

    checkFavoriteStatus();
  }, [userId, recipeId]);

  const handleAddToFavorites = async () => {
    try {
      const response = await fetch("/api/v1/recipe/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
      });

      if (response.ok) {
        setIsFavorite(true);
      } else {
        console.error("Error al añadir a favoritos");
      }
    } catch (error) {
      console.error("Error al añadir a favoritos", error);
    }
  };

  return (
    <button
      onClick={handleAddToFavorites}
      disabled={isFavorite || loading}
      className={`border border-black p-2 rounded mt-2 transition duration-300 ${
        isFavorite
          ? "bg-[#FF6724] text-white border border-white"
          : "bg-transparent hover:bg-[#FF6724] hover:text-white  hover:border-white"
      }`}
    >
      {isFavorite ? "Añadido a favoritos" : "Añadir a favoritos"}
    </button>
  );
};

export default AddToFavoritesButton;