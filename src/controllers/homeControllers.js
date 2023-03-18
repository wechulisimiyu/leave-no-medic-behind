const router = require("express").Router();
const Runner = require("../models/Order");
const Vendor = require("../models/Vendor");
const multer = require("multer");
const { cloudinary } = require("../../config/cloudinary");

const buyTshirt = async (req, res) => {
  if (req.body.student === "no") {
    if (req.body.regNumber) {
      delete req.body.regNumber;
    }
  }
  const data = req.body;
  console.log(data);
  const newRunner = new Runner(req.body);
  let amount;
  if (req.body.totalAmount) {
    amount = req.body.totalAmount;
  } else if (req.body.amount) {
    amount = req.body.amount;
  }
  const phone = req.body.phone;
  console.log(`Data: amount is ${amount}, and number is ${phone}`);

  try {
    const savedRunner = await newRunner.save();

    res.status(200);
    res.redirect(`/checkout?amount=${amount}&phone=${phone}`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving data: " + err });
  }
};

const createVendor = async (req, res) => {
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
        url: result.secure_url,
      },
    });
    // Save vendor
    await vendor.save();
    res.json(vendor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Could not create vendor" });
  }
};

module.exports = { buyTshirt, createVendor };
