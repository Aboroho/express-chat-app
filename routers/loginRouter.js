// external imports
const express = require("express");
const multer = require("multer");

// internal imports
const {
  getLogin,
  loginHandler,
  logoutHandler,
} = require("../controllers/loginController");
const {
  loginFieldValidator,
  loginFieldValidatorHandler,
} = require("../middlewares/login/loginValidators");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { redirectLoggedIn } = require("../middlewares/common/authorize");

const router = express.Router();

router.get("/", decorateHtmlResponse("Login"), redirectLoggedIn, getLogin);

router.post(
  "/",

  decorateHtmlResponse("Login"),
  loginFieldValidator,
  loginFieldValidatorHandler,
  loginHandler
);

router.delete("/", logoutHandler);

module.exports = router;
