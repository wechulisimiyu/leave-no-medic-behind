const router = require("express").Router();
const {
  transporter,
  mailOptions,
} = require("../controllers/sendmailController");

const rateLimit = require("express-rate-limit");

// Enable rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per 15 minutes
});

// post req to mail
router.post("/sendmail", limiter, async (req, res) => {
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
    } catch (error) {
        res.status(500)
        console.error(error);
    }
});

module.exports = router;
