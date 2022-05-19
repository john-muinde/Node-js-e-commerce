const Product = require("../models/product");

exports.getIndexPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      docTitle: "My Shop",
      path: "/",
      firstText: "",
    });
  });
};

exports.getAllProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Products",
      path: "/products",
      firstText: "All Products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product=>{
    res.render('shop/product-details',{
      product: product,
      docTitle: product.title,
      path: '/products'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    docTitle: "My Cart",
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId)
  // res.render("shop/cart", {
  //   path: "/cart",
  //   docTitle: "My Cart",
  // });
  res.redirect('/');
};
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    docTitle: "My Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    docTitle: "Checkout",
  });
};
