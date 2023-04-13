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
const {
  donationSchema,
  orderSchema,
  vendorSchema,
} = require("../utils/schemaValidation");
const {
  vendorMessage,
  universityPartnerMessage,
} = require("../utils/mailMessageTemplates");
// const { verifyTshirtPurchase } = require("../middleware/verifyTshirtPurchase");

const buyTshirt = async (req, res) => {
  console.log(req.body);

  // Validate request body against orderSchema
  const { error, value } = orderSchema.validate(req.body);
  if (error) {
    console.log(error);
    req.flash(
      "error",
      "Some information is missing. Please try again"
    );
    return res.redirect("/buy-tshirt");
  }

  const amount = value.totalAmount;
  const email = value.email;
  // const phone = formatPhoneNumber(value.phone)
  const phone = value.phone;
  const university = value.university;
  console.log(
    `Data: amount is ${amount}, email is ${email}, and number is ${phone}`
  );
  const state = 'purchase'
  const newOrder = new Order(value);

  try {
    if (university && university === "partner") {
      mailOptions.to = email;
      mailOptions.html = universityPartnerMessage;
      req.flash(
        "partnerRedirect",
        "Hello there! You are seeing this message because you are a partner from Mount Kenya University, Kenyatta University, Egerton University or Jomo Kenyatta University of Agriculture and Technology. Please check your email for more information."
      );

      // Send the email using Nodemailer
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error occurred:", error.message);
          return process.exit(1);
        }
        console.log("Message sent successfully!", info);
      });
      res.redirect("/donate");
    } else {
      const savedOrder = await newOrder.save();
      
      console.log(`SavedOrder: ${savedOrder}`);
      
      res.status(200).redirect(`/checkout?state=${state}&amount=${amount}&phone=${phone}&email=${email}`);
    }
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
      "Some information is missing. Please try again"
    );
    return res.redirect("/donate");
  }

  const amount = value.amount;
  // const phone = formatPhoneNumber(value.phone)
  const phone = value.phone;
  const email = value.email;

  console.log(
    `Data: amount = ${amount}, phone number = ${phone}, email = ${email}`
  );
  const state = 'donate'
  const newDonation = new Donation(value);
  try {

    const savedDonation = await newDonation.save();
    console.log(`SavedDonation: ${savedDonation}`);
    
    res.status(200).redirect(`/checkout?state=${state}&amount=${amount}&phone=${phone}&email=${email}`);
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
  // Validate request body against donationSchema
  const { error, value } = vendorSchema.validate(req.body);
  if (error) {
    console.log(error);
    req.flash(
      "error",
      "Some information is missing. Please try again"
    );
    return res.redirect("/vendors");
  }

  const email = value.email;

  try {
    // Upload image to cloudinary
    const schoolIdPics = await Promise.all(
      req.files.map((file) => cloudinary.uploader.upload(file.path))
    );

    // Create an array of objects containing the public ID and URL for each uploaded image
    const picData = schoolIdPics.map((pic) => {
      return { public_id: pic.public_id, url: pic.url };
    });

    console.log(picData);

    // Create new vendor with schoolIdPic property
    const newVendor = new Vendor({
      ...value,
      schoolIdPic: picData,
    });

    mailOptions.to = email;
    mailOptions.html = vendorMessage;

    // Send the email using Nodemailer
    // await transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log("Error occurred:", error.message);
    //     return process.exit(1);
    //   }
    //   console.log("Message sent successfully!", info);
    // });

    // Save vendor
    await newVendor.save();

    req.flash("success", "We have captured your details successfully");
    res.status(201).redirect("/donate");
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
