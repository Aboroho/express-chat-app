function getInbox(req, res, next) {
  res.render("inbox", {
    title: "Login Page",
  });
}

module.exports = {
  getInbox,
};
