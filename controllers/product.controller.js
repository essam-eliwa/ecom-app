import Product from '../models/product.model.js';

//get all products

const getProducts = async (req, res, next) => {
    //res.send("All Products Test Message");
    const products = Product.find({}).then((products) => {
      res.json(products);
    }).catch((err) => {
      next(err);
    });
  
  };

  export default getProducts;