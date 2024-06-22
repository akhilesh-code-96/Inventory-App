import path from 'path';
import ProductModel from '../models/product.model.js';


export default class ProductController {
  getProduct(req, res) {
    let products = ProductModel.get();
    // console.log(products);
    // console.log(path.resolve());
    res.render("products", {products:products});
    // return res.sendFile(path.join(path.resolve(), "src", "views", "products.html"));
  }
}