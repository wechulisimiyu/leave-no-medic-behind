const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { roles } = require("../controllers/rolesController");

router.get("/register", (req, res) => {
  res.render("admin/register", { name: "new admin" });
});

router.post("/register", userController.register);

router.get("/login", (req, res) => {
  res.render("admin/login");
});

router.post("/login", userController.login);

router.get(
  "/user/:userId",
  userController.allowIfLoggedin,
  userController.getUser
);

router.get(
  "/users",
  userController.allowIfLoggedin,
  userController.grantAccess("readAny", "profile"),
  userController.getUsers
);

router.put(
  "/user/:userId",
  userController.allowIfLoggedin,
  userController.grantAccess("updateAny", "profile"),
  userController.updateUser
);

router.delete(
  "/user/:userId",
  userController.allowIfLoggedin,
  userController.grantAccess("deleteAny", "profile"),
  userController.deleteUser
);

// Route for the orders page
router.get(
  "/orders",
  // userController.allowIfLoggedin,
  // userController.grantAccess("readAny", "orders"),
  (req, res) => {
    res.render("admin/orders");
  }
);

// Route for the payments page
router.get(
  "/payments",
  // userController.allowIfLoggedin,
  // userController.grantAccess("readAny", "payments"),
  (req, res) => {
    res.render("admin/payments");
  }
);

// Route for the pickups page
router.get(
  "/pickups",
  // userController.allowIfLoggedin,
  // userController.grantAccess("readAny", "pickups"),
  (req, res) => {
    res.render("admin/pickups");
  }
);

// Route for the vendors page
router.get(
  "/vendors",
  // userController.allowIfLoggedin,
  // userController.grantAccess("readAny", "vendors"),
  (req, res) => {
    res.render("admin/vendors");
  }
);

// Route for the stock page
router.get(
  "/stock",
  // userController.allowIfLoggedin,
  // userController.grantAccess("readAny", "stock"),
  (req, res) => {
    res.render("admin/stock");
  }
);

// Route for the profile page
router.get(
  "/admin/profile/:userId",
  userController.allowIfLoggedin,
  userController.grantAccess("readOwn", "profile"),
  (req, res) => {
    res.render("admin/profile", { user: req.user });
  }
);

// Route for editing the profile
router.put(
  "/profile/:userId",
  userController.allowIfLoggedin,
  userController.grantAccess("updateOwn", "profile"),
  (req, res) => {
    res.send("You can edit your profile");
  }
);

// Route for deleting the profile
router.delete(
  "/profile/:userId",
  userController.allowIfLoggedin,
  userController.grantAccess("deleteOwn", "profile"),
  (req, res) => {
    res.send("You can delete your profile");
  }
);

// Route for the admin page
router.get(
  "/",
  // userController.allowIfLoggedin,
  // userController.grantAccess("readAny", "admin"),
  (req, res) => {
    // const user = req.body.name;
    console.log(req.body);
    res.render("admin/admin");
  }
);

module.exports = router;
