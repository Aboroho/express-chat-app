const express = require("express");

// import internals
const { getUser, addUser } = require("../controllers/userController");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");
const { authorize } = require("../middlewares/common/authorize");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

// user page
router.get("/", decorateHtmlResponse("user"), authorize, getUser);

// create user
router.post(
  "/",

  avatarUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);

module.exports = router;
