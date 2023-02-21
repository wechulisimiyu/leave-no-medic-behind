const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

// loading the config files
dotenv.config({ path: './config/config.env' })

const yourEmail = "mail@mail.com";
const yourPass = process.env.MAIL_PASS;
const mailHost = "smtp.mailtrap.io";
const mailPort = 465;
const senderEmail = 'dummy@gmail.com'

/**
 * Send mail
 * @param {string} to 
 * @param {string} subject 
 * @param {string[html]} htmlContent 
 * @returns 
 */

const to = 'dummy@gmail.com'
const subject = 'Nice Nodemailer test'
const htmlContent = '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br />'

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "00ea599d8f95c3",
    pass: "39c7c45f182282"
  }
})

const mailOptions = {
  from: senderEmail,
  to: to,
  subject: subject,
  html: htmlContent,
}

module.exports = { transporter, mailOptions }