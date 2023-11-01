const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const { unlink } = require("fs");
const path = require("path");

// internal import
const People = require("../../models/People");

const addUserValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (email) => {
      try {
        const people = await People.findOne({ email: email });
        if (people) {
          throw createError("Email already exists");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .custom(async (mobile) => {
      try {
        const people = await People.findOne({ mobile: mobile });
        if (people) {
          throw createError("Mobile number exists");
        }
      } catch (err) {
        console.log(err);
        throw createError(err.message);
      }
    }),

  check("password"),
  // .isStrongPassword()
  // .withMessage(
  //   "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
  // ),
];

// after validation middlewires above, this function will be envoked
const addUserValidationHandler = async function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  // checking whether there is an error or not
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // we found some validation error
    // remove uploaded file
    if (req.files && req.files.length > 0) {
      const { filename } = req.files[0];
      const FILE_DIR = path.join(
        __dirname,
        `/../../public/uploads/avatar/${filename}`
      );

      unlink(FILE_DIR, (err) => console.log(err));
    }

    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidator,
  addUserValidationHandler,
};
