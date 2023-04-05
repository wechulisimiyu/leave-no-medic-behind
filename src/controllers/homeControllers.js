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

  const amount = value.totalAmount;
  const email = value.email;
  // const phone = formatPhoneNumber(value.phone)
  const phone = value.phone;
  const university = value.university;
  console.log(
    `Data: amount is ${amount}, email is ${email}, and number is ${phone}`
  );

  const newOrder = new Order(value);

  try {
    if (university && university.value === "partner") {
      mailOptions.to = email;
      mailOptions.html = `<p>Dear Participants,</p>
      <p>Thank you for your interest in the upcoming charity run. If you are a student from Mount Kenya University, Kenyatta University, Egerton University or Jomo Kenyatta University of Agriculture and Technology, please note that you will sign up for the run and purchase t-shirts through your school's liaison.</p>
      <p>We have liaisons from each of these universities who will facilitate your sign-up and t-shirt purchase. You can find their contact information below, and they will be happy to assist you with any questions or concerns you may have.</p>
      <p>We apologize for any inconvenience this may cause, but we believe that this process will make it easier for you to participate in the event and purchase your t-shirts. Thank you for your understanding, and we look forward to seeing you at the charity run.</p>
      <ul>
        <li>Egerton</li>
        <ul>
          <li>Hannah Njuguna 0759679960</li>
        </ul>
        <li>JKUAT</li>
        <ul>
          <li>Davis 0111 727518</li>
          <li>Brenda 0746 120652</li>
          <li>Winnie 0112331714</li>
        </ul>
        <li>MKU</li>
        <ul>
          <li>Lynet 0794019309</li>
        </ul>
        <li>KU</li>
        <ul>
          <li>Samson +254 736 867475</li>
        </ul>
      </ul>
      <p>Best regards,</p>
      <p>2023 LNMB Charity Run Organizing Team</p>    
      `;
      req.flash(
        "partnerRedirect",
        "Hello there! You are seeing this message because you are a partner from Mount Kenya University, Kenyatta University, Egerton University or  Jomo Kenyatta University of Agriculture and Technology. Please check your email for more information."
      );

      // Send the email using Nodemailer
      await transporter.sendMail(mailOptions);
      res.redirect("/donate");
    } else {
      const savedOrder = await newOrder.save();
      mailOptions.to = email;

      // Send the email using Nodemailer
      await transporter.sendMail(mailOptions);
      console.log(`SavedOrder: ${savedOrder}`);

      res.status(200);
      res.redirect(`/checkout?amount=${amount}&phone=${phone}&email=${email}`);
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
      "Invalid request data. Please check your inputs and try again"
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

  const newDonation = new Donation(value);
  try {
    mailOptions.to = email;
    mailOptions.html = `<p>Dear Donor,</p>
    <p>Thank you for choosing to donate to our cause. Your contribution will go a long way in helping us raise awareness and funds for medical students in need.</p>
    <p>We appreciate your generosity and support for our mission to provide financial assistance and resources to our student doctors who are in need of financial aid.</p>
    <p>You can check our website for more details about our cause and upcoming events.</p>
    <p>Thank you again for your support, and we look forward to your continued partnership with us!</p>
    <p>Best regards,</p>
    <p>2023 LNMB RUN ORGANIZING COMMITTEE</p>
    `;

    // Send the email using Nodemailer
    await transporter.sendMail(mailOptions);

    const savedDonation = await newDonation.save();
    console.log(`SavedDonation: ${savedDonation}`);
    res.redirect(`/checkout?amount=${amount}&phone=${phone}&email=${email}`);
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
      "Invalid request data. Please check your inputs and try again"
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
    mailOptions.html = `<p>Dear Prospective Vendor,</p>
    <p>Thank you for signing up to sell your wares at our upcoming run. We appreciate your interest in participating and supporting our cause to raise awareness and funds for medical students in need.</p>
    <p>We are thrilled to have you as a vendor, and we look forward to working with you to make this event a success. Please note that we will be sending you more information via email on the logistics of the event, including set up and breakdown times.</p>
    <p>Please take the time to visit our website to learn more about our cause and upcoming events. Your contribution will make a significant impact in the lives of student doctors who are in need of financial assistance.</p>
    <p>Once again, thank you for your support, and we look forward to your continued partnership with us.</p>
    <p>Best regards,</p>
    <p>2023 LNMB RUN ORGANIZING COMMITTEE</p>
    `;

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
