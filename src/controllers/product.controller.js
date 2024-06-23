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

  addNewProduct(req, res) {
    // validate data.
    const { name, price, imageUrl } = req.body;
    let errors = [];
    if (!name || name.trim() == "") {
      errors.push("Name is required");
    }
    if (!price || parseFloat(price) < 1) {
      errors.push("Price must be a positive value");
    }
    try {
      const validUrl = new URL(imageUrl);
    } catch (error) {
      errors.push("Url is invalid");
    }

    if (errors.length > 0) {
      return res.render("new-product", { errorMessage: errors[0] });
    }

    ProductModel.add(req.body);
    let products = ProductModel.get();
    return res.render("products", { products });
  }
}
