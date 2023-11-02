function decorateHtmlResponse(page_title) {
  return function (req, res, next) {
    res.locals.title = `${page_title} - ${process.env.APP_NAME}`;
    res.locals.html = true;
    res.locals.errors = {};
    res.locals.username = "";
    res.locals.user = {};
    next();
  };
}

module.exports = decorateHtmlResponse;
