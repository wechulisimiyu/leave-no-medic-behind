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

// GET route for checkout
router.get("/checkout", (req, res) => {
  const amount = req.query.amount;
  const phone = req.query.phone;
  res.render("checkout", { amount, phone });
});

router.post("/checkout", async (req, res) => {
  const amount = req.body.amount;
  const phone = req.body.phone;

  // Make a POST request to the /initiateSTKPush route with the amount and phone number
  try {
    const response = await axios.post("payment/initiateSTKPush", {
      amount: amount,
      phone: phone,
    });

    // Redirect the user to the success page with the reference number
    res.redirect(`payment/success?referenceNumber=${response.data.referenceNumber}`);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", (req, res) => {
  res.render("home", { name: "Person" });
});

module.exports = router;
