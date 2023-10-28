"use client";

import { useState } from "react";
import UserPage from "./user";
import CreateRecipe from "./createRecipe";
import { Button } from "@mui/material";

export default function MenuUser({ users }) {
  const [page, setPage] = useState(2);

  const handleButtonPage = (e) => {
    setPage(e.target.id);
  };

  const Conditional = ({ page }) => {
    if (page == 2) {
      return <CreateRecipe />;
    } else {
      return <></>;
    }
  };
  return (
    <div className="grid grid-cols-3">
      <UserPage className="col-span-1" {...users[0]} />
      <div className="flex flex-col col-span-2">
        <div className="flex  justify-center gap-2 p-5">
          <Button
            onClick={handleButtonPage}
            id={0}
            className=" basis-1/4 rounded-md text-green-700 borde"
          >
            Mis recetas
          </Button>
          <Button
            onClick={handleButtonPage}
            id={1}
            className=" basis-1/4 rounded-md text-green-700 border "
          >
            Recetas favoritas
          </Button>
          <Button
            onClick={handleButtonPage}
            id={2}
            className=" basis-1/4 rounded-md text-green-700 border "
          >
            Añadir receta
          </Button>
          <Button
            onClick={handleButtonPage}
            id={3}
            className=" basis-1/4 rounded-md text-green-700 border "
          >
            Lista de la compra
          </Button>
        </div>
        <div>
          <Conditional page={page} />
        </div>
      </div>
    </div>
  );
}
