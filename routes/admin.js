const express = require("express");
const path = require("path");

const router = express.Router();

// const rootDir = require('../util/path');
const adminController = require("../controllers/admin");

router.get("/add",adminController.getAddProduct);

router.post("/add",adminController.postAddProduct);

router.get("/products",adminController.getAdminProducts);

module.exports = router
