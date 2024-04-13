const mongoose = require("mongoose");
const User = require("./user");
const SchemaTypeObjId = mongoose.Schema.Types.ObjectId;

const Transaction = new mongoose.Schema({
  itemList: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    quantity: { type: Number, default: 0 },
    totalItemPrice: { type: Number, default: 0 }
  }],
  totalAmount: {
    type: Number,
    default: 0,
    required: true
  },
  totalItems: {
    type: Number,
    default: 0,
    required: true
  },
  paymentType: {
    type: String,
    enum: ["DEBIT", "CREDIT"]
  },
  cardType: {
    type: String,
    enum: ["VISA", "MASTERCARD", "AMEX"]
  },
  credentials: {
    type: String
  },
  userId: {
    type: SchemaTypeObjId,
    ref: "user",
    required: true
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: false
  },
  time: {
    type: Date,
    default: Date.now()
  }
},
  {
    timestamps: true,
    autoCreate: true
  })

module.exports = mongoose.model("transaction", Transaction, "transaction");