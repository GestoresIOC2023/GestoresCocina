import React from 'react';
import "../styles/recipeDetail.css";
import ChecklistIcon from '@mui/icons-material/Checklist';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import CreateShoppingList from './CreateShoppingList';
import { useState, useEffect } from 'react';


const RecipeDetail = ({ recipeData, ingredients }) => {
  const user_id = 'google-oauth2|109739526878968317870';
  //const user_id ='';

  
  function handleOnClick() {
    const recipe_id = recipeData.recipe.recipe_id
   
    const ing_name = ingredients.map((ing) => ing.ingredient_name);
    console.log(ing_name)
    const bodyData = JSON.stringify(ing_name);
    fetch(`/api/v1/recipe/postShoppingList/${user_id}/${recipe_id}/${bodyData}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Indicar que el contenido es JSON
      },
      // body: bodyData // Pasar los datos en el cuerpo de la solicitud
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // O manejar la respuesta como sea apropiado
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
      
  return (
    <div>
      <div className='info-general'>
        {recipeData.recipe && (
          <div className='info-img'>
            <img src={recipeData.recipe.recipe_picture} alt={recipeData.recipe.title} />
          </div>
        )}
        <div className='info-basic'>
          <div>
            {recipeData.recipe && <h1 className='name-recipe'>{recipeData.recipe.title}</h1>}
          </div>
          <div className='time-servings'>
            <div className='servings'>
              <img src='../cubiertos.png' />
              <p>{recipeData.recipe && <span >{recipeData.recipe.servings}</span>} raciones</p>
            </div>
            <div className='time'>
              <img src='../reloj.png' />
              <p>{recipeData.recipe && <span >{recipeData.recipe.cook_time}</span>}  min</p>
            </div>
          </div>
        </div>
      </div>
      <div className='ingredients-preparation'>
        <div className='ingredients'>
          <h2 className='name-ig-pr'>INGREDIENTES
          {user_id && 
            <Tooltip TransitionComponent={Zoom} disableFocusListener title="Añadir a la lista de la compra">
              <Button
                sx={{ float: 'right' }}
                variant="contained"
                color='warning'
                endIcon={<ChecklistIcon color='action' />}
                onClick={handleOnClick} />
            </Tooltip>
          }
          </h2>
          <ul className='name-ig'>
            {ingredients && ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.quantity} de {ingredient.ingredient_name} </li>
            ))}




          </ul>
        </div>
        <div className='preparation'>
          <h2 className='name-ig-pr'>PREPARACIÓN</h2>
          <p className='preparation-data'>{recipeData.recipe && <span >{recipeData.recipe.description}</span>}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
