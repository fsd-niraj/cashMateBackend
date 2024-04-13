const express = require("express");
const router = express.Router();
const { createUser, userLogin, userLogout, getUserDetails, updateUser } = require("../controllers/auth");
const { auth } = require("../middlewares/auth");

router.post("/create-user", createUser)
router.post("/user-login", userLogin)
router.post("/user-logout", userLogout)
router.post("/get-user-details", auth(), getUserDetails)
router.post("/update-user", updateUser)

module.exports = router;