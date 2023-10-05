import express from "express";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname, sep } from "path";
import compression from "compression";
import controller from "./controllers/controller.js";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep,
  cfg = {
    port: process.env.PORT || 5001,
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

app.use(cors());
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(cfg.port, () => {
  console.log(`listening on port ${cfg.port}`);
});

app.get("/", (req, res) => {
  response.send("ok");
});

//endpoints protegidos
app.get("/api/v1/users", jwtCheck, controller.getUser);
app.post("/api/v1/users", jwtCheck, controller.createUser);
