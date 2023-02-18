const router = require("express").Router();
const Runner = require("../models/Order");
const { createVendor, uploadVendorPic } = require('../controllers/vendor');

router.post("/buy-tshirt", async (req, res) => {
  if (req.body.student === "no") {
    if (req.body.regNumber) {
      delete req.body.regNumber;
    }
  }
  console.log(req.body);
  const newRunner = new Runner(req.body);
  try {
    const savedRunner = await newRunner.save();
    res.status(200);
    res.redirect("/");
  } catch (err) {
    if (err.code === 11000) {
      const duplicateKey = Object.keys(err.keyValue)[0];
      res
        .status(400)
        .json({
          message: `${duplicateKey} ${err.keyValue[duplicateKey]} already exists`,
        });
    } else {
      console.log(err);
      res.status(500).json({ message: "Error saving data: " + err });
    }
  }
});

router.get("/buy-tshirt", (req, res) => {
  res.render("buy-tshirt");
});

// GET route for /vendors
router.get("/vendors", (req, res) => {
  res.render("vendors");
});

// POST route for /vendors
router.post('/vendors', uploadVendorPic, createVendor);

router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
