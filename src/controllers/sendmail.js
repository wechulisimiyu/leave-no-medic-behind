const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

// loading the config files
dotenv.config({ path: './config/config.env' })

const yourEmail = "wechuli07@gmail.com";
const yourPass = process.env.MAIL_PASS;
const mailHost = "mail.eduniquetransform.org";
const mailPort = 465;
const senderEmail = 'from@example.com'

/**
 * Send mail
 * @param {string} to 
 * @param {string} subject 
 * @param {string[html]} htmlContent 
 * @returns 
 */

const to = 'doshdosh012@gmail.com'
const subject = 'Nice Nodemailer test'
const htmlContent = '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br />'

const transporter = nodemailer.createTransport({
  host: mailHost,
  port: mailPort,
  secure: true, // use SSL - TLS
  auth: {
    user: 'developers@eduniquetransform.org',
    pass: 'd8mBUXfDyoxSKz',
  },
})

const mailOptions = {
  from: senderEmail,
  to: to,
  subject: subject,
  html: htmlContent,
}


// const sendMail = (to, subject, htmlContent) => {
  

  

//   return transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.log(error);
//     }
//     console.log('Message sent: %s as the message ID, and %s as the response', info.messageId);
//   }); // promise
// };

// sendMail()

module.exports = { transporter, mailOptions }