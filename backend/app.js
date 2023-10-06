import express from "express";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname, sep } from "path";
import compression from "compression";
import userController from "./controllers/userController.js";
import recipeController from "./controllers/recipeController.js";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep,
  cfg = {
    port: process.env.EXPRESS_PORT || 5001,
    dir: {
      root: __dirname,
      controllers: __dirname + "controllers" + sep,
      models: __dirname + "models" + sep,
      routes: __dirname + "routes" + sep,
    },
    authRequired: false,
    jwtCheck: {
      audience: process.env.AUDIENCE,
      issuerBaseURL: process.env.ISSUERBASEURL,
      TOCKENSIGNINGALG: process.env.TOCKENSIGNINGALG
    }
  };
const jwtCheck = auth(cfg.jwtCheck);
const app = express();

app.use(cors());//Necesario para conectar el front y el back
app.disable("x-powered-by"); //Buena practica para hacer el sitio mas seguro ocultando la tecnologia con la que se ha desarrollado
app.use(morgan("dev")); //Tipo de log que queremos que muestre morgan
app.use(compression()); // reduce el tamaño de las respuestas del servidor haciendolo mas eficiente
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//necesario para post

app.listen(cfg.port, () => {
  console.log(`listening on port ${cfg.port}`);
});

app.get("/", (req, res) => {
  response.send("ok");
});

//endpoints protegidos
app.get("/api/v1/users", jwtCheck, userController.getUser);
app.post("/api/v1/users", jwtCheck, userController.createUser);

app.get("/api/v1/recipeById/:id", recipeController.getRecipe);

app.post("/api/v1/recipe");
app.patch("/api/v1/updateRecipeById/:id");
app.get("/api/v1/ingredient/:name");
app.post("/api/v1/ingredient/:name");
