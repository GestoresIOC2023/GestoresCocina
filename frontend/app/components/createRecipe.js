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

export default function CreateRecipe({ user_id }) {
  const [previewImageRecipe, setPreviewImageRecipes] = useState(
    "/8810f0fa-6017-4643-ae33-8ce63ebde66a.jpg"
  );
  const [ingredient, setIngredient] = useState();
  const [quantity, setQuantity] = useState();
  const [ingredients, setAddIngredient] = useState([]);

  const handleIngredient = (e) => {
    setIngredient(e.target.value);
  };
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const setIsChecked = (value, formValue) => {
    if (
      formValue.healthy ||
      formValue.dairy_free ||
      formValue.vegan ||
      formValue.gluten_free
    ) {
      return true;
    }
    return false;
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
    if (name === "photoRecipe") {
      if (data[name][0]) {
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
    }
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    if (data.photoRecipe[0]) {
      formData.append("file", data.photoRecipe[0]);
    }
    formData.append("ingredient", data.ingredient);
    formData.append("instructions", data.description);
    formData.append("title", data.title);
    formData.append("time", data.cook_time);
    formData.append("servings", data.servings);
    formData.append("vegetarian", data.vegan || null);
    formData.append("glutenFree", data.gluten_free || null);
    formData.append("dairyFree", data.dairy_free || null);
    formData.append("veryHealthy", data.healthy || null);
    formData.append("file", data.photoRecipe);

    await fetch("/api/update/recipes", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <form className="min-h-screen" onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="sm" className="flex flex-col p-10 items-center ">
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
        <div className="flex flex-col justify-center items-center pb-4">
          <label
            className=" bg-blue-400 rounded-md px-4 py-1 max-w-fit"
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
            {...register("photoRecipe", { required: true })}
          />
          <div>
            {errors.title && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <TextField
            label="Titulo"
            {...register("title", { required: true, pattern: "[0-9]*" })}
            {...register("title")}
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
            {...register("cook_time", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <TextField
            label="Servings"
            InputProps={{ type: "number" }}
            {...register("servings")}
          />
          {errors.title && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
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
              label="Healthy"
              control={
                <Checkbox
                  value={"Healthy"}
                  {...register("healthy", { validate: setIsChecked })}
                />
              }
            />
            <FormControlLabel
              label="Vegan"
              control={
                <Checkbox
                  value={"Vegan"}
                  {...register("vegan", { validate: setIsChecked })}
                />
              }
            />
            <FormControlLabel
              label="Dairy Free"
              control={
                <Checkbox
                  value={"Dairy Free"}
                  {...register("dairy_free", { validate: setIsChecked })}
                />
              }
            />
            <FormControlLabel
              label="Gluten Free"
              control={
                <Checkbox
                  value={"Gluten Free"}
                  {...register("gluten_free", { validate: setIsChecked })}
                />
              }
            />
            {errors.healthy &&
              errors.dairy_free &&
              errors.vegan &&
              errors.gluten_free && (
                <span className="text-red-500">Este campo es requerido</span>
              )}
          </div>
          <div className="flex flex-col py-4">
            <TextareaAutosize
              placeholder="Descripción"
              className="grow p-3 resize-none border border-gray-200 outline-none"
              minRows={10}
              maxRows={10}
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
          </div>

          <input
            className="bg-green-400 px-4 py-1 rounded-md disabled:bg-gray-500 max-w-fit"
            type="submit"
            value="Guardar"
          />
        </div>
      </Container>
    </form>
  );
}
