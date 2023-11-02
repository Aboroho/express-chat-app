const jwt = require("jsonwebtoken");

async function authorize(req, res, next) {
  function authorizeError(error) {
    const errorMsg = {
      errors: {
        unauthorize: {
          msg: "you are not authorize",
        },
      },
    };
    if (res.locals.html) {
      res.render("login", errorMsg);
    } else {
      res.status(401).json(errorMsg);
    }
  }

  // extracting cookie
  const token =
    Object.keys(req.signedCookies).length > 0
      ? req.signedCookies[process.env.COOKIE_NAME]
      : null;

  // checking token exists or not
  if (!token) return authorizeError();

  try {
    // decoding data from jwt token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // if the token is valid -> assign decoded value to loggedInUser so that we can use in views
    if (res.locals.html) {
      res.locals.user = decoded;
    }
    next();
  } catch (err) {
    if (res.locals.html) {
      res.redirect("/");
    } else {
      next(err);
    }
  }
}

async function redirectLoggedIn(req, res, next) {
  const token =
    Object.keys(req.signedCookies).length > 0
      ? req.signedCookies[process.env.COOKIE_NAME]
      : null;

  if (token) {
    try {
      await jwt.verify(token, process.env.JWT_SECRET);
      res.redirect("/inbox");
    } catch {
      next();
    }
  } else next();
}

module.exports = {
  authorize,
  redirectLoggedIn,
};
