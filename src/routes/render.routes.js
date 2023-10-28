import { Router } from "express";
import { ctrlRender } from "../controllers/rendercontroller.js";

const routerRender = Router();

routerRender.get("/", ctrlRender.renderExpressFileupload);
routerRender.get("/cloudinary", ctrlRender.renderCloudinary);

export { routerRender };


