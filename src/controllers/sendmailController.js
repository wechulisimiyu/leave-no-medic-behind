const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

// loading the envariables
dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.SENDER_PASSWORD
  }
})

const mailOptions = {
  from: `"LNMB" <${process.env.SENDER_MAIL}>`,
  to: '',
  subject: '',
  html: ''
}

module.exports = { transporter, mailOptions }
