const express = require("express");

// internal import
const { getInbox } = require("../controllers/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { authorize } = require("../middlewares/common/authorize");

const router = express.Router();

router.get("/", decorateHtmlResponse("Inbox"), authorize, getInbox);

module.exports = router;
