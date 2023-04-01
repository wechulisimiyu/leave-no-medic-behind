const router = require("express").Router();
const multer = require("multer");
const { storage } = require("../../config/cloudinary");
const { buyTshirt, createVendor } = require("../controllers/homeControllers");

router.post("/buy-tshirt", buyTshirt);

router.get("/buy-tshirt", async (req, res) => {
  res.render("buy-tshirt");
});

// GET route for /vendors
router.get("/vendors", (req, res) => {
  res.render("vendors");
});

// GET route for /about us
router.get("/about", (req, res) => {
  res.render("about");
});

// GET route for /about us
router.get("/faq", (req, res) => {
  res.render("faq");
});

const parser = multer({ storage: storage });

// POST route for /vendors
router.post("/vendors", parser.array("schoolIdPic"), createVendor);

router.get("/", (req, res) => {
  res.render("home", { name: "Person" });
});

module.exports = router;
