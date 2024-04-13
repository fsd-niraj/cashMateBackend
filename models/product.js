const mongoose = require("mongoose");
const SchemaTypeObjId = mongoose.Schema.Types.ObjectId;

const Product = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  userId: {
    type: SchemaTypeObjId,
    ref: "user"
  }
},
  {
    timestamps: true,
    autoCreate: true
  })

module.exports = mongoose.model("product", Product, "product");