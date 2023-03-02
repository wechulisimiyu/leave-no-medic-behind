const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

// loading the config files
dotenv.config({ path: './config/config.env' })

const senderEmail = `"Testing" <${process.env.SENDER_MAIL}>`
const to = process.env.TO_MAIL;
const subject = 'A Nodemailer test'
const htmlContent = '<b>Hey there! </b><br> This is our second message sent with Nodemailer<br />'

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 465,
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.SENDER_PASSWORD
  }
})

const mailOptions = {
  from: senderEmail,
  to: to,
  subject: subject,
  html: htmlContent,
}

module.exports = { transporter, mailOptions }