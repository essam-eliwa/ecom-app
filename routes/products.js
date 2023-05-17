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
router.post("/", (req, res, next) => {
    res.json({message: `Product Created ${req.body.name}`});
});

//Update a product: /products/:id
router.patch("/:id", (req, res, next) => {
    res.json({message: `Product Updated id= ${req.params.id} new value = ${req.body.name}`});
});

//Delete a product: /products/:id
router.delete("/:id", (req, res, next) => {
    res.json({message: `Product Deleted id= ${req.params.id}`});
});

export default router;
