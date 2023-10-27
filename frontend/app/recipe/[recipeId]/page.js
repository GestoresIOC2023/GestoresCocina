"use client";

import RecipeDetail from '@/app/components/RecipeDetail';
import { useEffect, useState } from 'react';

export default function Recipe({params}) {
    
    const {recipeId} = params;
    const [recipeData, setRecipeData] = useState({});

    useEffect(() => {
        if (recipeId) {
            fetch(`/api/v1/recipes/${recipeId}`)
            .then((response) => response.json())
            .then((data) => setRecipeData(data));
        }
      }, [recipeId]);
    
  return (
    <div>
        <div><RecipeDetail recipeData={recipeData} /></div>
    </div>
  );

}
