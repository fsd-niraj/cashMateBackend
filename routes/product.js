const express = require("express");
const paginate = require("../middlewares/paginate");
const product = require("../models/product");
const { addProduct, updateProduct, deleteProduct, getAllProducts } = require("../controllers/product");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/add-product", auth(), addProduct)
router.post("/get-all-products", auth(), getAllProducts)
router.post("/update-product", auth(), updateProduct)
router.post("/delete-product", auth(), deleteProduct)

module.exports = router