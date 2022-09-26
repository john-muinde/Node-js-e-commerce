const fs = require("fs");
const path = require("path");
const dirName = require("../util/path");
const p = path.join(dirName, "data", "cart.json");
const Product = require("../models/product");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //Fetch previous cart
    let cart = { products: [], totalPrice: 0 };

    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //Analyse the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      //Add new product/Increase new quantity
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]);
      }
      const allProducts = JSON.parse(fileContent).products;
      const finalProducts = [];
      let count = 0;
      allProducts.map((element) => {
        Product.findById(element.id, (product) => {
          finalProducts.push({...product,element});
          if (finalProducts.length == allProducts.length) {
            cb(finalProducts);
          }
        });
      });
    });
  }
};
