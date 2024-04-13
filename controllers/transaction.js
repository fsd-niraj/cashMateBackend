const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Responder = require("../services/responder");
const Transaction = require("../models/transaction");
const User = require("../models/user");
const { generateTransactionsPDF } = require("../services/pdfGenerator");

module.exports = {
  async getAllTransactions(req, res) {
    try {
      const { _id } = req.user;
      const params = req.query || {};
      if (!_id) return Responder.respondCustomErr({ req, res, message: "User id not provided" });
      let transactions = await Transaction.find(params).sort({ _id: -1 }).exec();
      transactions = transactions.filter(trans => trans.userId == _id);
      return Responder.success({ req, res, data: transactions, message: 'Transactions fetched successfully' })
    } catch (error) {
      return Responder.internalServerError({ req, res, error })
    }
  },
  async createShortTransaction(req, res) {
    try {
      const { itemList, cardType } = req.body;
      const { _id } = req.user;
      if (!_id) return Responder.respondCustomErr({ req, res, message: "User id not provided" });

      function getTotalItems(list = []) {
        return list.reduce((acc, curr) => acc += curr.quantity, 0);
      }

      function getTotalAmount(list = []) {
        return list.reduce((acc, curr) => acc += curr.totalItemPrice, 0)
      }
      const details = {
        userId: _id,
        itemList: itemList,
        totalItems: getTotalItems(itemList),
        totalAmount: getTotalAmount(itemList),
        paymentType: getTotalAmount(itemList) > 0 ? "CREDIT" : "DEBIT",
        cardType: cardType,
        status: true
      }

      await Transaction.create(details)
        .then(async (res) => {
          await User.updateOne({ _id: new ObjectId(_id) }, { $push: { "transactions": new ObjectId(res._id) } })
        })
        .catch((err) => {
          return Responder.internalServerError({ req, res, error: err })
        })
      return Responder.success({ req, res, message: 'Transaction successfully' })
    } catch (error) {
      return Responder.internalServerError({ req, res, error })
    }
  },
  async getTransactionDetails(req, res) {
    try {
      const { _id } = req.user;
      const { transactionId } = req.body;
      if (!_id) return Responder.respondCustomErr({ req, res, message: "User id not found" });
      if (!transactionId) return Responder.respondCustomErr({ req, res, message: "Transaction id not found" });
      // let response = await Transaction.findOne({ userId: new ObjectId(_id), _id: new ObjectId(transactionId) }, "itemList").populate().exec();
      let response = await Transaction.findById({ _id: new ObjectId(transactionId) }, "itemList").populate("itemList._id").exec();
      if (!response) return Responder.respondCustomErr({ req, res, message: "Transaction not found" });
      return Responder.success({ req, res, data: response, message: 'Transactions fetched successfully' })
    } catch (error) {
      return Responder.internalServerError({ req, res, error })
    }
  },
  async downloadTransactionPdf(req, res){
    try {
      const { _id } = req.user;
      generateTransactionsPDF;
      return Responder.success({ req, res, data: null, message: 'Transactions pdf downloaded successfully.' })
    } catch (error) {
      return Responder.internalServerError({ req, res, error })
    }

  }
}