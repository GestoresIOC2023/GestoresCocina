import express from "express";
import morgan from "morgan";
import  multer from "multer";
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

//funcion para controlar que endpoints necesitan autentificación
const jwtCheck = auth(cfg.jwtCheck);

//direccion donde se almacenan las fotos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {

      cb(null, `${file.originalname}`)
  }
});
const upload = multer({storage});
const app = express();

app.use(cors());//Necesario para conectar el front y el back
app.disable("x-powered-by"); //Buena practica para hacer el sitio mas seguro ocultando la tecnologia con la que se ha desarrollado
app.use(morgan("dev")); //Tipo de log que queremos que muestre morgan
app.use(compression()); // reduce el tamaño de las respuestas del servidor haciendolo mas eficiente
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + 'public'));

app.listen(cfg.port, () => {
  console.log(`listening on port ${cfg.port}`);
});

app.get("/", (req, res) => {
  res.send("ok");
});


//endpoints protegidos
app.get("/api/v1/userById/:user_id", jwtCheck, userController.getUser);
app.post("/api/v1/users", jwtCheck, userController.createUser);
//se utiliza upload para poder subir ficheros a express
app.put("/api/v1/users", jwtCheck, upload.single('file'), userController.updateUser);

//recipes
app.get("/api/v1/recipes/:recipe_id", recipeController.getRecipe);
app.get("/api/v1/getRecipesSortedByDate", recipeController.getRecipesSortedByDate);
app.get("/api/v1/getRecipesSortedByScore", recipeController.getRecipesSortedByRating);
app.post("/api/v1/recipes", upload.single('file'), recipeController.postRecipe);
app.delete("/api/v1/recipes/:recipe_id", recipeController.deleteRecipe);
app.get('/api/v1/recipes/:recipe_id/ingredients', recipeController.getIngredientsByRecipeId);
app.get("/api/v1/recipesByCat/:category", recipeController.getRecipeByCategory);
app.get("/api/v1/recipesByUserId/:userId", recipeController.getRecipesByUserId);
app.put("/api/v1/recipe/",upload.single('file'), recipeController.updateRecipe);
app.post("/api/v1/recipe/postShoppingList/:userid/:recipe_id/:ingredients", recipeController.postShoppingList);
app.get("/api/v1/recipe/getShoppingList/:userid", recipeController.getShoppingList);
app.delete("/api/v1/recipe/deleteShoppingList/:userid", recipeController.deleteShoppingList);