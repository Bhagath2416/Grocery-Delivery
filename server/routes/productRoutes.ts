import express from "express";
import { createProduct, deleteProduct, getFlashDeals, getProduct, getProducts, updateProduct } from "../controllers/productController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const productRouter = express.Router();

productRouter.get("/flash-deals", getFlashDeals)
productRouter.get("/", getProducts);
// to get an individual product
productRouter.get("/:id", getProduct);

// Protected APIs

// Only an admin should be able to modify products.
// POST   /api/products
// PUT    /api/products/:id
// DELETE /api/products/:id

// These should use authentication and authorization middleware.
// create a new product

// before executing this create product function it will execute auth and admin
productRouter.post("/", auth,admin,createProduct);
productRouter.put("/:id",auth,admin, updateProduct);
productRouter.delete("/:id",auth,admin,deleteProduct);

export default productRouter