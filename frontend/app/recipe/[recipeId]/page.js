"use client";

import RecipeDetail from '@/app/components/RecipeDetail';
import { useEffect, useState } from 'react';

export default function Recipe({params}) {
    
    const {recipeId} = params;
    const [recipeData, setRecipeData] = useState({});
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
      if (recipeId) {
        // Realizar una solicitud para obtener los detalles de la receta
        fetch(`/api/v1/recipes/${recipeId}`)
          .then((response) => response.json())
          .then((data) => setRecipeData(data));
  
        // Realizar una solicitud para obtener los ingredientes
        fetch(`/api/v1/recipes/${recipeId}/ingredients`)
          .then((response) => response.json())
          .then((data) => setIngredients(data.ingredients));
      }
    }, [recipeId]);
    
  return (
    <div>
        <div><RecipeDetail recipeData={recipeData} ingredients={ingredients}/></div>
    </div>
  );

}
