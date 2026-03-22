import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import isAdminUser from "../middlewares/adminMiddleware.js";

const adminRouter = express.Router();

adminRouter.get("/welcome", authMiddleware, isAdminUser, (req, res, next) => {
  res.json({
    message: "Welcome to the admin page",
  });
  next();
});

export default adminRouter;
