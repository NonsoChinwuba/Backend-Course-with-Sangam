import express from "express";
import {
  registerUser,
  loginUser,
  changePassword,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/change-password", authMiddleware, changePassword);

export default authRouter;
