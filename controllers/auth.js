const upload = require("../middlewares/uploadImages");
const { uploadToCloudinary } = require("../services/cloudinary");
const { generateToken } = require("../services/commonGeneration");
const Responder = require("../services/responder"),
  User = require("../models/user");
const { uploadSingle } = require("./upload");

module.exports = {
  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email }).exec();
      if (existingUser) return Responder.alreadyExist({ req, res, message: "Email already exists" });
      const userPayload = {
        name: name,
        email: email,
        password: password,
        accessToken: generateToken(res, { email })
      };

      const createdUser = await User.create(userPayload);
      const dataToSend = {
        user: {
          name: createdUser.name,
          email: createdUser.email,
          _id: createdUser._id
        },
        accessToken: createdUser.accessToken
      }

      return Responder.created({ req, res, data: dataToSend, message: 'User created' });
    } catch (error) {
      return Responder.internalServerError({ req, res, error });
    }
  },

  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return Responder.respondCustomErr({ req, res, message: "Please provide email & password" })

      let existing = await User.findOne({ email }).exec();
      if (!existing) return Responder.notFound({ req, res, message: "Incorrect email id or password" });

      const isPasswordValid = await existing.matchPassword(password)
      if (!isPasswordValid) return Responder.unauthorized({ req, res, message: "Incorrect email id or password" });

      const dataToSend = {
        user: {
          name: existing.name,
          email: existing.email,
          _id: existing._id
        },
        accessToken: generateToken(res, { email, _id: existing._id })
      }
      existing.accessToken = generateToken(res, { email, id: existing._id })
      existing.save()

      return Responder.success({ req, res, data: dataToSend, message: 'Login successful' });
    } catch (error) {
      return Responder.internalServerError({ req, res, error });
    }
  },

  async getUserDetails(req, res) {
    try {
      const { _id } = req.user;
      if (!_id) return Responder.respondCustomErr({ req, res, message: "User id not found" })
      const user = await User.findById(_id).select('-password')
      if (!user) return Responder.respondCustomErr({ req, res, message: "User not found" });
      // const totalEarnings = user.transactions.reduce((acc, curr) => acc += curr.totalAmount, 0);
      // await user.updateOne({ totalEarnings });
      return Responder.success({ req, res, data: user, message: 'User details fetched' });
    } catch (error) {
      return Responder.internalServerError({ req, res, error });
    }
  },
  async updateUser(req, res) {
    try {
      const { _id } = req.user;
      if (!_id) return Responder.respondCustomErr({ req, res, message: "User id not found" })
      const user = await User.findById(_id).select('-password');
      if (!user) return Responder.respondCustomErr({ req, res, message: "User not found" })
      return Responder.success({ req, res, data: user, message: 'User logged out' });
    } catch (error) {
      return Responder.internalServerError({ req, res, error });
    }
  },
  async userLogout(req, res) {
    try {
      // if (!req.cookies.auth) return Responder.noContent({ req, res })
      res.clearCookie("auth", { httpOnly: true, sameSite: 'none', secure: true })
      return Responder.success({ req, res, message: 'User logged out' });
    } catch (error) {
      return Responder.internalServerError({ req, res, error });
    }
  }
}