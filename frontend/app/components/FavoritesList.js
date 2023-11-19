import React, { useState, useEffect } from "react";

const FavoritesList = ({ userId, onClick }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    if (onClick) {
      fetchFavorites();
    }
  }, [userId, onClick]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#FF6724]">Tus recetas favoritas:</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.recipe_id} className="mb-2">
              <div
                className="cursor-pointer text-[#FF6724] bg-[#F6E9E0] py-2 px-4 rounded"
                onClick={() => {
                  window.location.href = `/recipe/${favorite.recipe_id}`;
                }}
              >
                {favorite.title}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;