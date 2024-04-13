const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadSingle } = require("../controllers/upload");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`)
  }
})

const upload = multer({ dest: "/images" })

router.post("/single", uploadSingle)

module.exports = router;