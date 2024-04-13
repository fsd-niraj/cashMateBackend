const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Responder = require("../services/responder");
const Product = require("../models/product")
const User = require("../models/user")

module.exports = {
  async addProduct(req, res) {
    try {
      const { name, price } = req.body;
      const { _id } = req.user;
      if (!_id) return Responder.respondCustomErr({ req, res, message: "User id not provided" });
      const newProduct = await Product.create({
        name: name,
        price: price,
        userId: new ObjectId(_id)
      })
      await User.findByIdAndUpdate({ _id }, { $push: { "products": new ObjectId(newProduct._id) } })
      return Responder.created({ req, res, data: { name, price }, message: 'Product added successfully' })
    } catch (error) {
      return Responder.internalServerError({ req, res, error })
    }
  },
  async getAllProducts(req, res) {
    try {
      const { _id } = req.user;
      if (!_id) return Responder.respondCustomErr({ req, res, message: "User id not provided" });
      let productList = await Product.find({}).exec();
      productList = productList.filter(prod => prod.userId == _id);
      return Responder.success({ req, res, data: { list: productList }, message: 'Products fetched' })
    } catch (error) {
      return Responder.internalServerError({ req, res, error })
    }
  },
  async updateProduct(req, res) {
    try {
      const { productId, name, price } = req.body;
      const isExist = await Product.findOne({ _id: new ObjectId(productId) })
      if (!isExist) return Responder.respondCustomErr({ req, res, message: "No Product found" })
      const updatedProduct = {
        name: name,
        price: price
      }
      await Product.findByIdAndUpdate(new ObjectId(productId), updatedProduct)
      return Responder.success({ req, res, message: 'Product updated successfully' })
    } catch (error) {
      return Responder.internalServerError({ req, res, error })
    }
  },
  async deleteProduct(req, res) {
    try {
      const { productId } = req.body;
      const isExist = await Product.findOne({ _id: new ObjectId(productId) })
      if (!isExist) return Responder.respondCustomErr({ req, res, message: "No Product found" })
      await Product.findByIdAndDelete(new ObjectId(productId))
      return Responder.success({ req, res, message: 'Product deleted successfully' })
    } catch (error) {
      return Responder.internalServerError({ req, res, error })
    }
  }
}