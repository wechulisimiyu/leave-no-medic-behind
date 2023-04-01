const router = require("express").Router();
const Runner = require("../models/Order");
const Vendor = require("../models/Vendor");
const multer = require("multer");
const { cloudinary } = require("../../config/cloudinary");
const {
  transporter,
  mailOptions,
} = require("../controllers/sendmailController");

const buyTshirt = async (req, res) => {
  if (req.body.student === "no") {
    if (req.body.regNumber) {
      delete req.body.regNumber;
    }
  }
  const newRunner = new Runner(req.body);
  let amount;
  if (req.body.donatedAmount) {
    amount = req.body.donatedAmount;
  } else {
    amount = req.body.totalAmount;
  }
  const phone = req.body.phone;
  console.log(`Data: amount is ${amount}, and number is ${phone}`);

  const email = req.body.email;

  try {
    const savedRunner = await newRunner.save();

    mailOptions.to = email;

    // Send the email using Nodemailer
    await transporter.sendMail(mailOptions);

    res.status(200);
    res.redirect(`/checkout?amount=${amount}&phone=${phone}`);
  } catch (err) {
    console.log(err);
    req.flash('error', 'Something went wrong. Let us try again but if it persists contact us')
    res.redirect("/buy-tshirt")
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
    res.status(201).redirect("/");
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error capturing your details. Try again')
    res.redirect('/vendors');
  }
};

module.exports = { buyTshirt, createVendor };
