const fs = require("fs");
const path = require("path");
const dirName = require("../util/path");
const Cart = require("./cart");
const p = path.join(dirName, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, description, imageUrl, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }
  static deleteById(id) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        console.log("Product error reading from Product: " + err);
        return;
      }
      const products = JSON.parse(fileContent);
      let updatedProducts = [...products];
      // console.log(updatedProducts);
      let product = updatedProducts.find((prod) => {
        return prod.id === id;
      });
      updatedProducts = updatedProducts.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.getSpecificProduct(id, (product) => {
            if (product) {
              Cart.deleteProduct(id, product.price);
            }
          });
        }
      });
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
