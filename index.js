const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const flash = require("connect-flash");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./src/models/User");
const homeRoute = require("./src/routes/homeRoutes");
const adminRoute = require("./src/routes/userRoutes");
const mailRoute = require("./src/routes/mailRoutes");

mongoose.set("strictQuery", true);

// loading the config files
dotenv.config({ path: "./config/config.env" });

// connect the db
connectDB();

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  secret: "secret",
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

//setting session expiry
const sessionConfig = {
  store: store,
  name: "dummy",
  secret: process.env.STORE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
}

app.use(session(sessionConfig));

// middlewares
app.use(express.json());
app.use(cors());
app.use(flash());
app.use(helmet());

// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.register = req.flash("register")
  res.locals.maintenance = req.flash("maintenance")
  next();
});

app.use("/", homeRoute);
app.use("/mail", mailRoute);
app.use("/admin", adminRoute);

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(
    `Serving at http://localhost:${port}, and the admin serving at http://localhost:${port}/admin`
  );
});
