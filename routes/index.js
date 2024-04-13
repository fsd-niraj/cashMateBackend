const express = require('express')
const router = express.Router()
const product = require("./product")
const transaction = require("./transaction")
const auth = require("./auth")

router.use("/auth", auth)
router.use("/transaction", transaction)
router.use("/product", product)

module.exports = router;