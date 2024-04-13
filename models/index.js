const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}

const User = require("./user")
// db.User = require("./user")
db.Store = require("./store")
db.Branch = require("./branch")

db.ROLES = ["user", "admin", "superadmin"]

module.exports = {
  User
};