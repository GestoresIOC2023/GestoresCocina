"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CreateRecipe from "./createRecipe";
import UserPage from "./user";
import { Container } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function MenuUser({ users }) {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className="flex-1" maxWidth="xl">
      <div className="grid grid-cols-3 min-h-full">
        <div className="col-span-1 bg-[#F6E9E0] py-20">
          <UserPage {...users[0]} />
        </div>
        <div
          className="col-span-2"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tabs
            className="bg-[#FF6724]"
            value={value}
            onChange={handleChange}
            centered
            variant="fullWidth"
            TabIndicatorProps={{ style: { backgroundColor: "black" } }}
          >
            <Tab
              className="text-white focus:text-black"
              label="Recetas favoritas"
            />
            <Tab className="text-white focus:text-black" label="Mis recetas" />
            <Tab
              className="text-white focus:text-black"
              label="Añadir receta"
            />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            Item One
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <CreateRecipe {...users[0]} />
          </CustomTabPanel>
        </div>
      </div>
    </Container>
  );
}
