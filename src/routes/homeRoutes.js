const router = require("express").Router()
const multer = require('multer')
const { storage } = require('../../config/cloudinary')
const { buyTshirt, createVendor } = require('../controllers/homeControllers')

router.post("/buy-tshirt", buyTshirt);

router.get("/buy-tshirt", (req, res) => {
  req.flash('register', 'Registration will be open on Saturday 25th March. Please bear with us');
  res.render("buy-tshirt");
});

// GET route for /vendors
router.get("/vendors", (req, res) => {
  res.render("vendors")
});

// GET route for /about us
router.get("/about", (req, res) => {
  res.render("about")
});

// GET route for /about us
router.get("/faq", (req, res) => {
  res.render("faq")
});

const parser = multer({ storage: storage });

// POST route for /vendors
router.post('/vendors', parser.single("schoolIdPic"), createVendor);

// GET route for checkout
router.get("/checkout", (req, res) => {
  res.render("checkout");
});

router.get("/", (req, res) => {
  res.render("home", {name: 'Person'});
});

module.exports = router;
