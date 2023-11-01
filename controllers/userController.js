const bcrypt = require("bcrypt");
const People = require("../models/People");

function getUser(req, res, next) {
  res.render("users", {
    title: "Login Page",
  });
}

async function addUser(req, res, next) {
  const { name, email, password, mobile } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatar =
    req.files && req.files.length > 0 ? req.files[0].filename : null;

  const newPeople = new People({
    name,
    email,
    password: hashedPassword,
    avatar,
    mobile,
  });

  try {
    const result = await newPeople.save();
    console.log(result);
    res.status(200).json({
      message: "User is added successfully!",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured",
        },
      },
    });
  }
}

module.exports = {
  getUser,
  addUser,
};
