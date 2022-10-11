const fs = require("fs");
const path = require("path");
const dirName = require("../util/path");
const p = path.join(dirName, "data", "cart.json");
const productsPath = path.join(dirName, "data", "products.json");

const getProductsFile = (cb) => {
  fs.readFile(productsPath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

const getSpecificProduct = (id, cb) => {
  getProductsFile((products) => {
    const product = products.find((p) => p.id === id);
    cb(product);
  });
};

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
      if (allProducts.length >= 1) {
        const finalProducts = [];
        allProducts.map((element) => {
          getSpecificProduct(element.id, (product) => {
            finalProducts.push({ ...product, element });
            if (finalProducts.length == allProducts.length) {
              cb(finalProducts);
            }
          });
        });
      } else {
        return cb([]);
      }
    });
  }

  static getCart = (cb) => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  };

  static getSpecificProduct = (id, cb) => {
    getProductsFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  };

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        console.log("Cart error reading from Cart: " + err);
        return;
      }
      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      // console.log(updatedCart);
      let product = updatedCart.products.find((prod) => {
        return prod.id === id;
      });
      // console.log(updatedCart);

      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice = +(
        updatedCart.totalPrice -
        productPrice * productQty
      ).toFixed(2);
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log("Deleting product from Cart: " + err);
      });
    });
  }
};
