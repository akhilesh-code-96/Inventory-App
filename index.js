import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import path from "path";

const PORT = 3000;
const server = express();

// setup view engine.
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"))

//create an instance of product controller.
const productController = new ProductController();
server.get("/", productController.getProduct);

//Middleware.
server.use(express.static('src/views'));

server.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
})
