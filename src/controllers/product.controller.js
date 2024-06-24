import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProduct(req, res) {
    let products = ProductModel.get();
    res.render("products", { products: products });
  }

  getAddForm(req, res) {
    return res.render("new-product", { errorMessage: null });
  }

  postAddProduct(req, res) {
    ProductModel.add(req.body);
    let products = ProductModel.get();
    return res.render("products", { products });
  }

  getUpdateProductView(req, res) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
      });
    } else {
      res.status(401).send("Product Not Found");
    }
  }

  postUpdateProductResponse(req, res) {
    ProductModel.update(req.body);
    let products = ProductModel.get();
    return res.render("products", { products });
  }

  deleteProduct(req, res) {
    const id = req.params.id;
    console.log(id);
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Product Not Found");
    }
    ProductModel.delete(id);
    let products = ProductModel.get();
    // res.render("products", { products });
    res.redirect("/");
  }
}
