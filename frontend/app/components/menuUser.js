"use client";

import { useState } from "react";
import UserPage from "./user";
import CreateRecipe from "./createRecipe";
import {Container } from "@mui/material";
import ButtonProfile from "./buttonProfile";

export default function MenuUser({ users }) {
  const [page, setPage] = useState(2);

  const handleButtonPage = (e) => {
    setPage(e.target.id);
  };

  const Conditional = ({ page, user_id }) => {
    if (page == 2) {
      return <CreateRecipe user_id={user_id} />;
    } else {
      return <></>;
    }
  };
  return (
    <Container maxWidth="xl">
      <div className="flex flex-col md:grid md:grid-cols-3 mt-8">
        <UserPage className="col-span-1" {...users[0]} />
        <div className="flex flex-col col-span-2 mt-4 md:mt-0">
          <div className="flex  justify-center gap-2 px-8">
            <ButtonProfile id={0} handleClick={handleButtonPage}>
              Mis recetas
            </ButtonProfile>
            <ButtonProfile id={1} handleClick={handleButtonPage}>
              Recetas favoritas
            </ButtonProfile>
            <ButtonProfile id={2} handleClick={handleButtonPage}>
              Añadir receta
            </ButtonProfile>
            <ButtonProfile id={3} handleClick={handleButtonPage}>
              Lista de la compra
            </ButtonProfile>
          </div>
          <div>
            <Conditional page={page} {...users[0]} />
          </div>
        </div>
      </div>
    </Container>
  );
}
