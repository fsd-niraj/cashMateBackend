const mongoose = require("mongoose");
const SchemaTypeObjId = mongoose.Schema.Types.ObjectId;
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  transactions: [{
    type: SchemaTypeObjId,
    ref: "transaction"
  }],
  products: [{
    type: SchemaTypeObjId,
    ref: "product"
  }],
  totalEarnings: {
    type: Number,
    default: 0
  },
  profileImageUrl: {
    type: String
  },
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  }
},
  {
    timestamps: true,
    autoCreate: true
  });

User.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

User.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("user", User, "user");