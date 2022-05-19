const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add", {
      docTitle: "Add Products",
      path: "/admin/add",
      activeAdd: true,
    });
  };
  
  exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const product = new Product(title,description,imageUrl,price);
    product.save();
    res.redirect("/products");
  };

  exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products) => {
      res.render("admin/products", {
        prods: products,
        docTitle: "Admin Products",
        path: "/admin/products",
        firstText: "Admin Products"
      });
    });
  };