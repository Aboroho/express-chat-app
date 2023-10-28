function getUser(req, res, next) {
  res.render("users", {
    title: "Login Page",
  });
}

module.exports = {
  getUser,
};
