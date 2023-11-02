const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(req, res, next) {
  next(createError(404, "Yor requested content was not found"));
}

// default error handler
function errorHandler(err, req, res, next) {
  console.log(err);
  const errors =
    process.env.NODE_ENV === "development" ? err : { message: err.message };
  res.status = err.status || 500;

  if (res.locals.html) {
    res.locals.errors = errors.msg;
    res.render("error", { title: "error page" });
  } else {
    console.log(err.stack);
    res.json(errors);
  }
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
