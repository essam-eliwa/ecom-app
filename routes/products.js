import { Router } from "express";

const router = Router();

//GET products: /products
router.get("/", (req, res, next) => {
  res.send("All Products Test Message");
});

//Get a single product: /products/:id
router.get("/:id", (req, res, next) => {
  res.send(`Single Product Test Message ${req.params.id}`);
});

//Create a product: /products

//Update a product: /products/:id

//Delete a product: /products/:id

export default router;
