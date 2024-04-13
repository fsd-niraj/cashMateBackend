const { v4: uuidv4 } = require("uuid")
const crypto = require("crypto");
const jwt = require('jsonwebtoken')

exports.generateOtp = () => {
  return Math.floor(100000 + Math.random() * 999999);
}

exports.getUniqueCode = (length, alphaNumeric) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  if (alphaNumeric) {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }
  } else {
    code = Math.floor(Math.random() * 10000).toString().padStart(length, '0')
  }
  return code;
}

exports.generateAccessToken = (credentials, expiresIn) => {
  return jwt.sign(credentials, process.env.JWT_ACCESS_SECRET, { expiresIn: expiresIn || "60s" })
}
exports.generateRefreshToken = (credentials) => {
  return jwt.sign(credentials, process.env.JWT_REFRESH_SECRET)
}

exports.generateToken = (res, cred) => {
  const token = jwt.sign(cred, process.env.JWT_ACCESS_SECRET, { expiresIn: "1h" })
  res.cookie("auth", token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
  return token;
}