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
  to: process.env.TO_MAIL,
  subject: 'Registration Confirmation - Leave no Medic Behind Run',
  html: `<p>Dear Runner,</p>
    <p>Thank you for registering for our annual "Leave no Medic Behind Run". We are thrilled to have you join us in supporting our cause to raise awareness and funds for medical students in need.</p>
    <p>As a registered participant, you are now part of a community dedicated to making a positive impact in the lives of your fellow colleagues and future doctors. Your participation will help us in our efforts to provide financial assistance and resources to our student doctors who are in need of financial assistance.</p>
    <p>You will be able to get your t-shirt from your chosen pick-up stations  from 17th April to 28th April (Monday- Friday from 11am to 3pm).</p>
    <p>Here are some important details regarding the event:</p>
    <ul>
      <li>Date: 29th April 2023</li>
      <li>Time: 7.30am</li>
      <li>Location: KMTC Field Off Ngong Road</li>
    </ul>
    <p>Please arrive at least 30 minutes before the start time for registration and warm-up exercises. We encourage you to invite friends and family members to join you on this day to show support for our fellow medics.</p>
    <p>We will all run with our LNMB t-shirts to show our solidarity as a tight knit community which cares for all our future medical professionals. In addition, we will have a water station at the halfway point of the run, and light refreshments will be available for purchase at the finish line.</p>
    <p>Thank you again for your support, and we look forward to seeing you at the event!</p>
    <p>Best regards,</p>
    <p>2023 LNMB RUN ORGANIZING COMMITTEE</p>`
}

module.exports = { transporter, mailOptions }