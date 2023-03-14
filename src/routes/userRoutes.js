const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  renderRegister,
  renderLogin,
} = require("../controllers/adminControllers");
const Orders = require("../models/Order");
const connectEnsureLogin = require("connect-ensure-login");
const passport = require("passport");

const isLoggedIn = connectEnsureLogin.ensureLoggedIn("admin/login");

router.route("/register").get(renderRegister).post(register);

router
  .route("/login")
  .get(renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/admin/login",
    }),
    login
  );

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("admin/profile");
});

// Route for the orders page
router.get("/orders", isLoggedIn, (req, res) => {
  res.render("admin/orders");
});

// Route for the payments page
router.get("/payments", isLoggedIn, (req, res) => {
  res.render("admin/payments");
});

// Route for the pickups page
router.get("/pickups", isLoggedIn, (req, res) => {
  res.render("admin/pickups");
});

// Route for the vendors page
router.get("/vendors", isLoggedIn, (req, res) => {
  res.render("admin/vendors");
});

// Route for the stock page
router.get("/stock", isLoggedIn, (req, res) => {
  res.render("admin/stock");
});

// Route for the profile page
router.get("/admin/profile/:userId", isLoggedIn, (req, res) => {
  res.render("admin/profile", { user: req.user });
});

// Route for editing the profile
router.put("/profile/:userId", isLoggedIn, (req, res) => {
  res.send("You can edit your profile");
});

// Route for deleting the profile
router.delete("/profile/:userId", isLoggedIn, (req, res) => {
  res.send("You can delete your profile");
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("admin/login");
});

// Route for the admin page
router.get("/", isLoggedIn, (req, res) => {
  res.render("admin/admin");
});

module.exports = router;
