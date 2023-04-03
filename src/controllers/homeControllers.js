const router = require("express").Router();
const Joi = require("joi");
const Order = require("../models/Order");
const Vendor = require("../models/Vendor");
const Donation = require("../models/Donation");
const multer = require("multer");
const { cloudinary } = require("../../config/cloudinary");
const {
  transporter,
  mailOptions,
} = require("../controllers/sendmailController");
const { donationSchema, orderSchema } = require("../utils/schemaValidation");
// const { verifyTshirtPurchase } = require("../middleware/verifyTshirtPurchase");

const buyTshirt = async (req, res) => {
  console.log(req.body);

  // Validate request body against orderSchema
  const { error, value } = orderSchema.validate(req.body);
  if (error) {
    console.log(error);
    req.flash(
      "error",
      "Invalid request data. Please check your inputs and try again"
    );
    return res.redirect("/buy-tshirt");
  }

  const newOrder = new Order(value);

  const amount = value.totalAmount;
  const phone = formatPhoneNumber(value.phone)
  console.log(`Data: amount is ${amount}, and number is ${phone}`);

  const email = value.email;

  try {
    const savedOrder = await newOrder.save();
    console.log(`SavedOrder: ${savedOrder}`);

    res.status(200);
    res.redirect(`/checkout?amount=${amount}&phone=${phone}`);
  } catch (err) {
    console.log(err);
    req.flash(
      "error",
      "Something went wrong. Let us try again but if it persists contact us"
    );
    res.redirect("/buy-tshirt");
  }
};

const donation = async (req, res) => {
  console.log(req.body);

  // Validate request body against donationSchema
  const { error, value } = donationSchema.validate(req.body);
  if (error) {
    console.log(error);
    req.flash(
      "error",
      "Invalid request data. Please check your inputs and try again"
    );
    return res.redirect("/donate");
  }

  const amount = value.amount;
  const phone = formatPhoneNumber(value.phone)
  const email = value.email;

  console.log(`Data: amount is ${amount}, and number is ${phone}`);

  const newDonation = new Donation(value);
  try {
    const savedDonation = await newDonation.save();
    console.log(`SavedDonation: ${savedDonation}`);
    res.redirect(`/checkout?amount=${amount}&phone=${phone}`);
  } catch (err) {
    console.log(err);
    req.flash(
      "error",
      "Something went wrong. Let us try again but if it persists contact us"
    );
    res.redirect("/donate");
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
    req.flash("error", "Error capturing your details. Try again");
    res.redirect("/vendors");
  }
};

const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters from the phone number
  const digitsOnly = phone.replace(/\D/g, "");

  // Check if the phone number starts with "254"
  if (digitsOnly.startsWith("254")) {
    return digitsOnly;
  } else if (digitsOnly.length === 9 && digitsOnly.startsWith("7")) {
    // If the phone number starts with "7" and is 9 digits long, assume it's a Kenyan number and add "254" at the beginning
    return `254${digitsOnly}`;
  } else {
    // Otherwise, return null to indicate that the phone number is invalid
    return null;
  }
};

module.exports = { buyTshirt, donation, createVendor };
