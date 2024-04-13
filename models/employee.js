const mongoose = require("mongoose");
const SchemaTypeObjId = mongoose.Schema.Types.ObjectId;
const bcrypt = require("bcrypt")

const Employee = new mongoose.Schema({
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  userEmail: {
    type: String,
    require: true
  },
  role: [{
    type: String,
    enum: ["employee", "admin", "superadmin", "anonymous"],
    default: "anonymous",
    required: true
  }],
  companyId: [{
    type: SchemaTypeObjId,
    ref: "company"
  }],
  sales: [{
    type: SchemaTypeObjId,
    ref: "transaction"
  }],
  code: {
    type: Number,
    min: 4,
    max: 4
  },
  accessToken: String,
  refreshToken: String,
  otp: Number,
  verified: {
    type: Date,
    default: Date.now(),
    expires: "1m"
  }
},
  {
    timestamps: true,
    autoCreate: true
  });

Employee.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
})

Employee.methods.comparePassword = async function(password){
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("Employee", Employee, "employee");