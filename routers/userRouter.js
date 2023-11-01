const express = require("express");

// import internals
const { getUser, addUser } = require("../controllers/userController");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

const router = express.Router();

// user page
router.get("/", getUser);

// create user
router.post(
  "/",

  avatarUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);

module.exports = router;
