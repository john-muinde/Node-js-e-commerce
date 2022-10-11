const path = require("path");

const express = require("express");

// const rootDir = require("../util/path");
// const adminData = require("./admin");
const productsController = require("../controllers/shop");

const router = express.Router();

router.get('/', productsController.getIndexPage);

router.get('/products',productsController.getAllProducts);

router.get('/products/:productId',productsController.getProduct);

router.get('/cart',productsController.getCart);

router.post('/cart',productsController.postCart);

router.post('/delete-product',productsController.postCartDeleteProduct);

router.get('/checkout',productsController.getCheckout);

router.get('/orders',productsController.getOrders);


module.exports = router;
