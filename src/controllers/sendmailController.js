const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

// loading the config files
dotenv.config({ path: './config/config.env' })

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
  to: process.env.TO_MAIL,
  subject: 'A Nodemailer test',
  html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br />',
}

module.exports = { transporter, mailOptions }