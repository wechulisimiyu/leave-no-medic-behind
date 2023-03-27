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
  if (req.body.donatedAmount) {
    amount = req.body.donatedAmount;
  } else {
    amount = req.body.totalAmount;
  }
  const phone = req.body.phone;
  console.log(`Data: amount is ${amount}, and number is ${phone}`);

  try {
    const savedRunner = await newRunner.save();

    res.status(200);
    res.redirect(`/checkout?amount=${amount}&phone=${phone}`);
  } catch (err) {
    console.log(err);
    res.redirect(500, '/500', { errorMessage: `Error saving data` });
  }
};

const createVendor = async (req, res) => {
  try {
    // Upload image to cloudinary
    const schoolIdPics = await Promise.all(
      req.files.map((file) => cloudinary.uploader.upload(file.path))
    );

    // Create new vendor
    let vendor = new Vendor({
      name: req.body.name,
      regNumber: req.body.regNumber,
      yearOfStudy: req.body.yearOfStudy,
      typeOfBusiness: req.body.typeOfBusiness,
      whatItSells: req.body.whatItSells,
      helperName: req.body.helperName,
      schoolIdPic: schoolIdPics.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      })),
    });

    // Save vendor
    await vendor.save();
    res.status(201).redirect('/vendor')
  } catch (err) {
    console.log(err);
    res.status(500).redirect('/500', { errorMessage: "Could not create vendor" });
  }
};

module.exports = { buyTshirt, createVendor };
