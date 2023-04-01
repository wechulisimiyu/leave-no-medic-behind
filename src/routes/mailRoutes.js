const router = require("express").Router();
const {
  transporter,
  mailOptions,
} = require("../controllers/sendmailController");

router.post("/sendmail", async (req, res) => {
  try {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: `Email has been sent.` });
  } catch (error) {
    res.status(500).json({ error: error.message || "something went wrong" });
  }
});

module.exports = router;
