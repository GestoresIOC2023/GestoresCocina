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
const jwtCheck = auth(cfg.jwtCheck);

//Esta funcion sirve para poder subir archivos a express
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

app.get("/api/v1/recipeById/:id", recipeController.getRecipe);

// app.post("/api/v1/recipe");
// app.patch("/api/v1/updateRecipeById/:user_id");
// app.get("/api/v1/ingredient/:name");
// app.post("/api/v1/ingredient/:name");
