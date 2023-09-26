import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';
import compression from 'compression';
import controller from './controllers/controller.js';
import cors from 'cors';
import dotenv from 'dotenv'


dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep,
  cfg = {
    port: process.env.PORT || 5001,
    dir: {
      root: __dirname,
      controllers: __dirname + 'controllers' + sep,
      models: __dirname + 'models' + sep,
      routes: __dirname + 'routes' + sep,
    }
  };
////asdasdasdasdz
const app = express();
app.use(cors());
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(compression());

app.use(express.urlencoded({ extended: true }));

app.listen(cfg.port, () => {
  console.log(`listening on port ${cfg.port}`);
});

app.get('/', (req, res)=>{
  res.redirect('/api/v1/users');
})
app.get('/api/v1/users', controller.getBosses);