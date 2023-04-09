const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const flash = require("connect-flash");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const morgan = require('morgan')
const helmet = require("helmet");
const methodOverride = require("method-override");
const rateLimit = require('express-rate-limit')
const homeRoute = require("./src/routes/homeRoutes");
const mailRoute = require("./src/routes/mailRoutes");
const paymentRoute = require("./src/routes/paymentRoutes");

mongoose.set("strictQuery", true);

// loading the envariables
dotenv.config()

// connect the db
connectDB();

const app = express();

// HTTP request logger middleware 
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 14, // limit each IP to 14 requests per 10 minutes
  message: "Too many requests from this IP, please try again later",
});

app.use(limiter);

// middlewares
app.use(express.json());
app.use(cors());
app.use(flash());
app.use(helmet());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.register = req.flash("register")
  res.locals.maintenance = req.flash("maintenance")
  res.locals.captured = req.flash("captured")
  res.locals.partnerRedirect = req.flash("partnerRedirect")
  next();
});

app.use("/", homeRoute);
app.use("/mail", mailRoute);
app.use("/payment", paymentRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(
    `Listening on 0.0.0.0:${port}`
  );
});
