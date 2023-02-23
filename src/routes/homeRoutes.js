const router = require("express").Router();
const Runner = require("../models/Order")
const Vendor= require("../models/Vendor")
const multer = require('multer')
const { cloudinary, storage } = require('../../config/cloudinary')

router.post("/buy-tshirt", async (req, res) => {
  if (req.body.student === "no") {
    if (req.body.regNumber) {
      delete req.body.regNumber;
      delete req.body.student_price
    }
  }
  const price = req.body.nonstudent_price
  const data = req.body
  console.log(data)
  const newRunner = new Runner(req.body)
  const amount = req.body.price
  const phone = req.body.phone
  console.log(`Data: amount is ${amount}, and number is ${phone}`)
  try {
    const savedRunner = await newRunner.save()

    res.status(200);
    res.redirect("/buy-tshirt")
    // res.redirect(`payment/stkPush?amount=${amount}&phone=${phoneNumber}`);
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error saving data: " + err });
    }
  }
);

router.get("/buy-tshirt", (req, res) => {
  res.render("buy-tshirt");
});

// GET route for /vendors
router.get("/vendors", (req, res) => {
  res.render("vendors");
});

const parser = multer({ storage: storage });

// POST route for /vendors
router.post('/vendors', parser.single("schoolIdPic"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new vendor
    let vendor = new Vendor({
      name: req.body.name,
      regNumber: req.body.regNumber,
      yearOfStudy: req.body.yearOfStudy,
      typeOfBusiness: req.body.typeOfBusiness,
      whatItSells: req.body.whatItSells,
      helperName: req.body.helperName,
      schoolIdPic: {
        public_id: result.public_id,
        url: result.secure_url
      }
    });
    // Save vendor
    await vendor.save();
    res.json(vendor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Could not create vendor" });
  }
});


router.get("/", (req, res) => {
  res.render("home", {name: 'Person'});
});

module.exports = router;
