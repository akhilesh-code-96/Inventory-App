// import path from 'path';
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProduct(req, res) {
    let products = ProductModel.get();
    res.render("products", { products: products });
  }

  getAddForm(req, res) {
    return res.render("new-product", {errorMessage: null});
  }

  postAddProduct(req, res) {
    ProductModel.add(req.body);
    console.log(req.body);
    let products = ProductModel.get();
    return res.render("products", { products });
  }
}
