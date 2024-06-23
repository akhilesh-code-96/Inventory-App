import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import { validationMiddleware } from "./src/middlewares/validate.middleware.js";

const PORT = 3000;
const server = express();

// parse form data.
server.use(express.urlencoded({extended: true}));

// setup view engine.
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"))

server.use(expressEjsLayouts);

//create an instance of product controller.
const productController = new ProductController();
//creating routes for all the functionalities.
server.get("/", productController.getProduct);
server.get("/add-product", productController.getAddForm);
// adding middleware specific to this method.
server.post('/', validationMiddleware, productController.postAddProduct);

//Middleware.
server.use(express.static('src/views'));

server.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
})
