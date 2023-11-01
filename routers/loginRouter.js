// external imports
const express = require("express");
const multer = require("multer");

// internal imports
const { getLogin, loginHandler } = require("../controllers/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const router = express.Router();

router.get("/", decorateHtmlResponse("Login"), getLogin);
router.post("/", multer().none(), loginHandler);

module.exports = router;
