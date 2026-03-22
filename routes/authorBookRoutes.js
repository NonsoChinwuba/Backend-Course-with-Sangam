import express from "express";
import {
  createAuthor,
  createBook,
  getBookWithAuthor
} from "../controllers/authorBookController.js";

const authorBookRouter = express.Router();

authorBookRouter.post("/author", createAuthor);
authorBookRouter.post("/book", createBook);
authorBookRouter.get("/book/:id", getBookWithAuthor)

export default authorBookRouter;
