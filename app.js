import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fileUpload from 'express-fileupload';
import 'dotenv/config';
import cloudinary from 'cloudinary';
import { router } from './src/routes/img.routes.js';
import { routerRender } from './src/routes/render.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  })

app.set("view engine", "ejs");
app.set('views', path.join(path.resolve(), './src/views'));

app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 25 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: "Archivo muy grande!"
  }))
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', router);
app.use('/', routerRender);


app.listen(port, () => {
    console.log(`Server listen in port ${port}`);
  });

