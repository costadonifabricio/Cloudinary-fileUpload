import { Router } from "express";
import  { ctrlFile } from "../controllers/imgcontroller.js";

const router = Router();

router.get("/", ctrlFile.getImages);
router.post("/upload", ctrlFile.submitFileExpressFileupload);
router.post("/uploadCloudinary", ctrlFile.submitFileCloudinary);
router.delete("/:id", ctrlFile.deleteImageOfDB);

export { router };
