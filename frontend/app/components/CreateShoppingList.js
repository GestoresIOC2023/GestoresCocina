import { useEffect, useState } from 'react';

export default function CreateShoppingList() {
    
    const {recipeId} = '481'
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch(`/api/v1/recipes/${recipeId}/ingredients`)
          .then((response) => response.json())
          .then((data) => setIngredients(data.ingredients));
      })
  return (
    ingredients.map((ingredient)=> ingredient.ingredient_name)
    
    );

}
