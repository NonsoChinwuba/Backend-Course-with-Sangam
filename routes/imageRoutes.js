import express from "express";
import {
  uploadImage,
  fetchImagesController,
  deleteImageController,
} from "../controllers/imageControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";

const imageRouter = express.Router();

imageRouter.post(
  "/upload-image",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImage,
);

imageRouter.get("/get-image", authMiddleware, fetchImagesController);
imageRouter.delete(
  "/delete-image/:id",
  authMiddleware,
  adminMiddleware,
  deleteImageController,
);

export default imageRouter;
