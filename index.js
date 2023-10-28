// external import
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// internal import
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

// routers
const loginRouter = require("./routers/loginRouter");
const userRouter = require("./routers/userRouter");
const inboxRouter = require("./routers/inboxRouter");

const app = express();
dotenv.config();

// connect database
const { MONG_CONNECTION_STRING } = process.env;
mongoose
  .connect(MONG_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);

// 404 not found
app.use(notFoundHandler);

// default error handler
app.use(errorHandler);

// start server
const { PORT, NODE_ENV } = process.env;
app.listen(PORT, () => {
  if (NODE_ENV === "development") {
    console.log("listening on http://localhost:" + PORT);
  } else if (NODE_ENV === "production") console.log("listening");
});
