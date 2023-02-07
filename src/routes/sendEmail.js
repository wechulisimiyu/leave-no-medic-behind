const router = require('express').Router()
const { transporter, mailOptions } = require('../controllers/sendmail')

router.post('/sendmail', async (req, res) => {
    try {
        const params = req.body
        console.log(params)
        mailOptions.to = req.body.email
        await transporter.sendMail(mailOptions.to)
        res.status(200).json({ message: `Email has been sent.` });
    } catch (error) {
        res.status(500).json({ error: error.message || 'something went wrong' });
    }
})

module.exports = router