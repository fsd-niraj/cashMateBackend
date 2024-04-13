const express = require("express");
const router = express.Router();
const { getAllTransactions, createShortTransaction, getTransactionDetails, downloadTransactionPdf } = require("../controllers/transaction");
const { auth } = require("../middlewares/auth");

router.post("/create-transaction", auth(), createShortTransaction)
router.post("/get-all-transactions", auth(), getAllTransactions)
router.post("/get-transaction-details", auth(), getTransactionDetails)
router.post("/download-transactions", auth(), downloadTransactionPdf)

module.exports = router;