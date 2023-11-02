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
    const errObject = {
      errors: {
        auth: {
          msg: "Email or password does not match",
        },
      },
    };
    if (res.locals.html) res.render("login", errObject);
    else res.status(401).json(errObject);
  }

  const { username, password } = req.body;

  try {
    // fetching people with email or phone
    const people = await People.findOne({
      $or: [{ email: username }, { mobile: username }],
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

    res.cookie(process.env.COOKIE_NAME, token, {
      maxAge: process.env.JWT_EXPIRY,
      httpOnly: true,
      signed: true,
    });

    // success response
    if (res.locals.html) {
      res.render("inbox");
    } else {
      res.json({
        status: "authenticated",
        _token: token,
      });
    }
  } catch (err) {
    // error response
    if (res.locals.html) {
      res.render("login", {
        errors: {
          common: {
            msg: "Something unknow happend!!",
          },
        },
      });
    } else {
      // any error from the server side - fall back to error handler
      next(err);
    }
  }
}

async function logoutHandler(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.sendStatus(404);
}

module.exports = {
  getLogin,
  loginHandler,
  logoutHandler,
};
