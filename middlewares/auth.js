const jwt = require('jsonwebtoken')
const Responder = require('../services/responder');
const User = require('../models/user');

exports.auth = (roles = []) => {
  if (!Array.isArray(roles)) roles = [roles];
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      const { authorization } = req.headers;
      // if (!authHeader || !authHeader.startsWith('Bearer ')) return Responder.unauthorized({ req, res, message: 'Please log in to access.' });
      const token = authorization?.split(" ")[1];
      if (!token) return Responder.unauthorized({ req, res, message: 'Unauthorized.' });
      jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, info) => {
        console.log(err)
        if (err) return Responder.unauthorized({ req, res, message: 'Invalid token' });
        if (!info._id) return Responder.unauthorized({ req, res, message: 'User id not found' });
        const isExist = await User.findOne({ _id: info._id })
        if (!isExist) return Responder.notFound({ req, res, message: "User not found" });
        req.user = info;
        return next();
      })
    } catch (error) {
      return Responder.internalServerError({ req, res, error });
    }
  }
};