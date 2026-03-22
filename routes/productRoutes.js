import express from "express";
import {
  insertSampleProducts,
  getProductStats,
  getProductAnalysis,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/add", insertSampleProducts);
productRouter.get("/stats", getProductStats);
productRouter.get("/analysis", getProductAnalysis);

export default productRouter;
