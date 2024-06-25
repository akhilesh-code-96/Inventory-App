import express from "express";
import ProductController from "./src/controllers/product.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path";
import validateRequest from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import UserController from "./src/controllers/user.controller.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";

const PORT = 3000;
const server = express();

server.use(express.static("public"));

server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

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
server.get("/logout", userController.logout);

//create an instance of product controller.
const productController = new ProductController();
//creating routes for all the functionalities.
server.get("/", auth, productController.getProduct);
server.get("/add-product", auth, productController.getAddForm);
server.get("/update-product/:id", auth, productController.getUpdateProductView);
server.post("/", auth, productController.postUpdateProductResponse);
server.post("/delete-product/:id", auth, productController.deleteProduct);
// adding middleware specific to this method.
server.post(
  "/upload",
  auth,
  uploadFile.single("imageUrl"),
  validateRequest,
  productController.postAddProduct
);

//Middleware.
server.use(express.static("src/views"));

server.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
