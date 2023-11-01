// external import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal import
const People = require("../models/People");

function getLogin(req, res, next) {
  res.render("login");
}

async function loginHandler(req, res, next) {
  function authError() {
    return res.status(401).json({
      errors: {
        auth: {
          msg: "Email or password does not match",
        },
      },
    });
  }

  const { email: emailOrPhone, password } = req.body;

  try {
    // fetching people with email or phone
    const people = await People.findOne({
      $or: [{ email: emailOrPhone }, { mobile: emailOrPhone }],
    });
    //  email or phone does not exist - return auth error
    if (!people) return authError();

    const passwordMatchStatus = await bcrypt.compare(password, people.password);
    // password does not match - return auth error
    if (!passwordMatchStatus) return authError();

    // everything is fine so far - creating jwt token and send
    const token = await jwt.sign(
      { name: people.name, email: people.email, phone: people.phone },
      process.env.JWT_SECRET
    );
    res.send({
      status: "authenticated",
      _token: token,
    });
  } catch (err) {
    // any error from the server side - fall back to error handler
    next(err);
  }
}

async function authorize(req, res, next) {}
module.exports = {
  getLogin,
  loginHandler,
  authorize,
};
