const router = require("express").Router();
const multer = require("multer");
const axios = require("axios");
const Order = require("../models/Order");
const { storage } = require("../../config/cloudinary");
const {
  buyTshirt,
  donation,
  createVendor,
} = require("../controllers/homeControllers");

// const { verifyTshirtPurchase } = require("../middleware/verifyTshirtPurchase");

router.post("/buy-tshirt", buyTshirt);
// router.post("/buy-tshirt", verifyTshirtPurchase, buyTshirt);

router.get("/buy-tshirt", async (req, res) => {
  res.render("buy-tshirt");
});

router.post("/donate", donation);

router.get("/donate", async (req, res) => {
  res.render("donate");
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

// GET route for checkout
router.get("/checkout", (req, res) => {
  const amount = req.query.amount;
  const phone = req.query.phone;
  res.render("checkout", { amount, phone });
});

router.post("/checkout", async (req, res) => {
  const amount = req.body.amount;
  const phone = req.body.phone;

  const data = {
    amount: amount,
    phone: phone,
  };

  // Make a POST request to the /initiateSTKPush route with the amount and phone number
  try {
    const response = await axios.post(
      "https://lnmb-run-stk-push.onrender.com/initiateSTKPush", data
    );

    return response.json();
    console.log(response);
  } catch (error) {
    console.log(error.message);
    req.flash('error', error.message);
    res.status(500).redirect('/checkout?amount=${amount}&phone=${phone}')
  }
});

router.get('/payment/callback', async (req, res) => {
  const phone = req.body.phone;

  try {
    const order = await Order.findOneAndUpdate({ phone: phone }, { paid: true });
    console.log(`Order with phone number ${phone} has been updated.`, order);
    res.redirect('/about');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/payment/error-callback', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
