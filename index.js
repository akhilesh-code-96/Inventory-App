import express from "express";
import ProductController from "./src/controllers/product.controller.js";

const PORT = 3000;
const server = express();


//create an instance of product controller.
const productController = new ProductController();
server.get("/", productController.getProduct);

//Middleware.
server.use(express.static('src/views'));

server.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
})
