import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const homeRouter = express.Router();

homeRouter.get("/welcome", authMiddleware, (req, res) => {
  const { username, userId, role } = req.userInfo;
  res.json({
    message: "Welcome to the home page",
    user: {
      _id: userId,
      username: username,
      role: role,
    },
  });
});

export default homeRouter;
