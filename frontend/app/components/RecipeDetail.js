import React from "react";
import "../styles/recipeDetail.css";
import ChecklistIcon from "@mui/icons-material/Checklist";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import DoneOutlineSharpIcon from "@mui/icons-material/DoneOutlineSharp";
import AddToFavoritesButton from "./addFavoritesButton";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RecipeDetail = ({ recipeData, ingredients }) => {
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (recipeData.recipe) {
      const recipe_id = recipeData.recipe.recipe_id;
      fetch(`/api/v1/recipe/rating/${userId}/${recipe_id}`).then(response => response.json()).then(data => {
        if (data.length === 0) {
          setRating(null);
        } else {
          setRating(data[0].rating);
        }
      });
    }
    const storedUserId = sessionStorage.getItem("user_id");
    setUserId(storedUserId);
  }, [recipeData]);

  function handleChangeRating(event, newValue) {
    if (newValue === null) {
      fetch(`/api/v1/recipe/rating`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          recipe_id: recipeData.recipe.recipe_id,
        })
      }).then(response => response.json()).then(data => {
        if (data.affectedRows === 1) {
          setRating(newValue);
        }
      });
      return;
    }
    if (rating === null) {
      fetch(`/api/v1/recipe/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          recipe_id: recipeData.recipe.recipe_id,
          rating: newValue,
        })
      }).then(response => response.json()).then(data => {
        if (data.affectedRows === 1) {
          setRating(newValue);
        }
      });
      return;
    }
    if (rating !== null) {
      fetch(`/api/v1/recipe/rating`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          recipe_id: recipeData.recipe.recipe_id,
          rating: newValue,
        })
      }).then(response => response.json()).then(data => {
        if (data.affectedRows === 1) {
          setRating(newValue);
        }
      });
      return;
    }
  }

  function handleOnClick() {
    console.log(recipeData);
    setOpen(true);
    const recipe_id = recipeData.recipe.recipe_id;
    const ing_name = ingredients.map((ing) => ing.ingredient_name);
    const bodyData = JSON.stringify(ing_name);
    fetch(
      `/api/v1/recipe/postShoppingList/${userId}/${recipe_id}/${bodyData}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <div className="info-general">
        {recipeData.recipe && (
          <div className="info-img">
            <img
              src={recipeData.recipe.recipe_picture}
              alt={recipeData.recipe.title}
            />
          </div>
        )}
        <div className="info-basic">
          <div>
            {recipeData.recipe && (
              <h1 className="name-recipe">{recipeData.recipe.title}</h1>
            )}
          </div>
          <div className="time-servings">
            <div className="servings">
              <img src="../cubiertos.png" />
              <p>
                {recipeData.recipe && <span>{recipeData.recipe.servings}</span>}{" "}
                raciones
              </p>
            </div>
            <div className="time">
              <img src="../reloj.png" />
              <p>
                {recipeData.recipe && (
                  <span>{recipeData.recipe.cook_time}</span>
                )}{" "}
                min
              </p>
            </div>
          </div>
          <div>
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                color: "#502918",
                paddingBottom: "2px",
              }}
              component="legend"
            >
              Puntuación
            </Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={handleChangeRating}
            />
          </div>
          <div>
            {console.log('recipeId:', recipeData.recipe && recipeData.recipe.recipe_id)}
            {userId && recipeData && recipeData.recipe && (
              <AddToFavoritesButton recipeId={recipeData.recipe.recipe_id} userId={userId} />
            )}
          </div>
        </div>
      </div>
      <div className="ingredients-preparation">
        <div className="ingredients">
          <h2 className="name-ig-pr">
            INGREDIENTES
            {userId && (
              <>
                <Tooltip
                  TransitionComponent={Zoom}
                  disableFocusListener
                  title="Añadir a la lista de la compra"
                >
                  <Button
                    sx={{ float: "right" }}
                    variant="contained"
                    color="warning"
                    endIcon={<ChecklistIcon color="action" />}
                    onClick={handleOnClick}
                  />
                </Tooltip>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500,
                    },
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                        align="center"
                      >
                        Lista Guardada <DoneOutlineSharpIcon color="success" />
                      </Typography>
                    </Box>
                  </Fade>
                </Modal>
              </>
            )}
          </h2>
          <ul className="name-ig">
            {ingredients &&
              ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} de {ingredient.ingredient_name}{" "}
                </li>
              ))}
          </ul>
        </div>
        <div className="preparation">
          <h2 className="name-ig-pr">PREPARACIÓN</h2>
          <p className="preparation-data">
            {recipeData.recipe && <span>{recipeData.recipe.description}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
