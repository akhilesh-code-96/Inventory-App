import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import validateRequest from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import UserController from "./src/controllers/user.controller.js";

const PORT = 3000;
const server = express();

server.use(express.static("public"));

// parse form data.
server.use(express.urlencoded({ extended: true }));

// setup view engine.
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(expressEjsLayouts);

// create an instance of userController model.
const userController = new UserController();
// setting up routes for the userController model.
server.get("/register", userController.getRegister);
server.get("/login", userController.getLogin);
server.post("/register", userController.postRegister);
server.post("/login", userController.postLogin);

//create an instance of product controller.
const productController = new ProductController();
//creating routes for all the functionalities.
server.get("/", productController.getProduct);
server.get("/add-product", productController.getAddForm);
server.get("/update-product/:id", productController.getUpdateProductView);
server.post("/", productController.postUpdateProductResponse);
server.post("/delete-product/:id", productController.deleteProduct);
// adding middleware specific to this method.
server.post(
  "/upload",
  uploadFile.single("imageUrl"),
  validateRequest,
  productController.postAddProduct
);

//Middleware.
server.use(express.static("src/views"));

server.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
