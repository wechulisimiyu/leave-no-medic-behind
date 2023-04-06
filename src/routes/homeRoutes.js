const router = require("express").Router();
const multer = require("multer");
const axios = require("axios");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const { storage } = require("../../config/cloudinary");
const {
  buyTshirt,
  donation,
  createVendor,
} = require("../controllers/homeControllers");
const {
  transporter,
  mailOptions,
} = require("../controllers/sendmailController");
const {
  runnerSignupMessage,
  donationMessage,
} = require("../utils/mailMessageTemplates");
const { paymentSchema } = require("../utils/schemaValidation");

// const { verifyTshirtPurchase } = require("../middleware/verifyTshirtPurchase");

router.post("/buy-tshirt", buyTshirt);
// router.post("/buy-tshirt", verifyTshirtPurchase, buyTshirt);

router.get("/buy-tshirt", async (req, res) => {
  res.render("buy-tshirt");
});

router.post("/donate", donation);

// GET route for /donate
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

// GET route for /faq
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
  const email = req.query.email;
  const state = req.query.state;
  res.render("checkout", { amount, phone, email, state });
});

// router.post("/checkout", async (req, res) => {
//   const amount = req.body.amount;
//   const phone = req.body.phone;

//   console.log(`Amount is ${amount}, and the phone is ${phone}`);

//   const data = {
//     amount: amount,
//     phone: phone,
//   };

//   const config = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   };

//   // Make a POST request to the /initiateSTKPush route with the amount and phone number
//   try {
//     const response = await axios.post(
//       "https://lnmb-run-stk-push.onrender.com/initiateSTKPush",
//       data,
//       config
//     );

//     return response.json();
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//     req.flash(
//       "error",
//       `${error.message}, please try again. If it persists, contact us`
//     );
//     res.redirect(`/checkout?amount=${amount}&phone=${phone}`);
//   }
// });

router.post("/checkout", async (req, res) => {
  console.log(req.body);
  const { state, amount, phone, email } = req.body;
  const message = req.body.confirmationMessage;

  console.log(
    `checkout route received ${amount}, ${phone}, ${email} and state is ${state}`
  );

  // Validate request body against paymentSchema
  const { error, value } = paymentSchema.validate(req.body);
  if (error) {
    console.log(error);
    req.flash(
      "error",
      "Invalid request data. Please check your inputs and try again"
    );
    console.log(phone);
    return res.redirect(
      `/checkout?state=${state}&amount=${amount}&phone=${phone}&email=${email}`
    );
  }

  // Validate confirmation message
  // const regex =
  //   /^Dear [A-Z\s]+, Your transaction of Kshs\. \d+\.\d{2} has successfully been deposited to Equity Account in favor of [A-Z\s]+ Ref\. Number [A-Z0-9]+ on \d{2}-\d{2}-\d{4} at \d{2}:\d{2}:\d{2}\. Thank you\.$/;
  // if (!regex.test(message)) {
  //   console.log("Invalid confirmation message:", message);
  //   req.flash(
  //     "error",
  //     "Invalid confirmation message. Please check your inputs and try again"
  //   );
  //   return res.redirect(
  //     `/checkout?state=${state}&amount=${amount}&phone=${phone}&email=${email}`
  //   );
  // }

  try {
    const payment = new Payment({
      state: state,
      amount: amount,
      phone: phone,
      email: email,
      confirmationMessage: message,
    });
    await payment.save();

    mailOptions.to = email;
    if (state === "purchase") {
      mailOptions.html = runnerSignupMessage;
      mailOptions.subject =
        "Registration Confirmation - Leave no Medic Behind Run";
      // Update the Order model where phone number matches
      const filter = { phone: phone };
      const update = { paid: true };
      const options = { new: true };
      const updatedOrder = await Order.findOneAndUpdate(
        filter,
        update,
        options
      );
    } else if (state === "donate") {
      mailOptions.html = donationMessage;
      mailOptions.subject = "Donation reception - Leave no Medic Behind";
    }

    // Send the email using Nodemailer
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred:", error.message);
        return process.exit(1);
      }
      console.log("Message sent successfully!", info);
    });

    console.log("Payment saved successfully.");
    console.log(payment);
    req.flash("success", "Payment details saved successfully.");
    res.status(200).redirect("/about");
  } catch (err) {
    console.error(err);
    req.flash("error", "Error saving payment details.");
    res
      .status(500)
      .redirect(`/checkout?amount=${amount}&phone=${phone}&email=${email}`);
  }
});

router.get("/payment/callback", async (req, res) => {
  const phone = req.body.phone;

  try {
    const order = await Order.findOneAndUpdate(
      { phone: phone },
      { paid: true }
    );
    console.log(`Order with phone number ${phone} has been updated.`, order);
    res.redirect("/about");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/payment/error-callback", (req, res) => {
  console.log(req.body);
  req.flash(
    "error",
    `${error.message}, please try again. If it persists, contact us`
  );
  res.redirect("/");
});

router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
