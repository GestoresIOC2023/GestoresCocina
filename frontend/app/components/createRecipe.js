"use client";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Container,
  TextField,
  TextareaAutosize,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateRecipe() {
  const [previewImageRecipe, setPreviewImageRecipes] = useState(
    "/8810f0fa-6017-4643-ae33-8ce63ebde66a.jpg"
  );
  const [ingredient, setIngredient] = useState();
  const [quantity, setQuantity] = useState();
  const [ingredients, setAddIngredient] = useState([]);
  const [isUpdate, setIsUptdate] = useState(true);

  const handleIngredient = (e) => {
    setIngredient(e.target.value);
  };
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const handleAddIngredients = (e) => {
    const newIngredients = [...ingredients];
    if (ingredient && quantity) {
      newIngredients.push({ ingredient: ingredient, quantity: quantity });
      setAddIngredient(newIngredients);
      setIngredient("");
      setQuantity("");
    }
  };
  const handleRemoveIngredients = (ingredient) => {
    const newIngredients = [...ingredients];
    const index = newIngredients.indexOf(ingredient);
    newIngredients.splice(index, 1);
    setAddIngredient(newIngredients);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  watch((data, { name }) => {
    if (name === "photoRecipes") {
      const file = data[name][0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImageRecipes(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImageRecipes(null);
      }
    }
    setIsUptdate(false);
  });

  return (
    <form className="min-h-screen">
      <Container maxWidth="sm" className="flex flex-col p-10 items-center">
        <div className="relative w-full h-96">
          <Image
            className="object-cover p-9"
            src={previewImageRecipe}
            fill
            sizes="300px"
            alt="Imagen"
            placeholder="empty"
          ></Image>
        </div>
        <div className="flex justify-center pb-4">
          <label
            className=" bg-blue-400 rounded-md px-4 py-1"
            htmlFor="recipes"
          >
            <span className="px-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </span>
            Subir foto
          </label>
          <input
            id="recipes"
            name="recipes"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            {...register("photoRecipes")}
          />
        </div>
        <div className="flex flex-col gap-5 w-full">
          <TextField
            label="Titulo"
            {...register("title", { required: true, pattern: "[0-9]*" })}
          />
          {errors.title && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <TextField
            type="number"
            label="Tiempo"
            {...register("cook_time")}
            InputProps={{
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            }}
          />
          <TextField
            label="Servings"
            InputProps={{ type: "number" }}
            {...register("servings")}
          />
          <div className="flex flex-col">
            <div className="flex flex-row gap-5 items-end justify-start">
              <TextField
                label="Ingrediente"
                value={ingredient}
                onChange={handleIngredient}
                className="w-2/3"
              />
              <TextField
                label="Cantidad"
                onChange={handleQuantity}
                value={quantity}
                className="w-1/3"
              />
              <IconButton onClick={handleAddIngredients}>
                <AddIcon />
              </IconButton>
            </div>
            <ul className="list-disc">
              {ingredients.map((ingredient) => (
                <div className="flex justify-between items-center">
                  <li className="ml-10 pt-4">{`${ingredient.quantity} ${ingredient.ingredient}`}</li>
                  <IconButton
                    onClick={() => handleRemoveIngredients(ingredient)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </div>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2">
            <FormControlLabel
              label="Categoria 1"
              control={<Checkbox value={1} />}
            />
            <FormControlLabel
              label="Categoria 2"
              control={<Checkbox value={2} />}
            />
            <FormControlLabel
              label="Categoria 3"
              control={<Checkbox value={3} />}
            />
            <FormControlLabel
              label="Categoria 4"
              control={<Checkbox value={4} />}
            />
          </div>
          <div className="flex flex-col py-4">
            <TextareaAutosize
              placeholder="Descripción"
              className="grow p-3 resize-none border border-gray-200 outline-none"
              minRows={10}
              maxRows={10}
            />
          </div>
        </div>
        
      </Container>
    </form>
  );
}
