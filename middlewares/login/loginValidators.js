// external import
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

const loginFieldValidator = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Email or Mobile is required"),

  check("password").isLength({ min: 1 }).withMessage("password is required"),
];

const loginFieldValidatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    if (res.locals.html) {
      res.render("login", {
        errors: mappedErrors,
        username: req?.body.username,
      });
    } else {
      res.status(401).json(mappedErrors);
    }
  }
};

module.exports = {
  loginFieldValidator,
  loginFieldValidatorHandler,
};
