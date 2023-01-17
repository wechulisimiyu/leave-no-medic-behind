const router = require('express').Router()
const Runner = require('../models/Runner')

router.post('/buy-tshirt', async (req, res) => {
    console.log(req.body)
    const newRunner = new Runner(req.body)
    try {
        const savedRunner = await newRunner.save()
        res.status(200).json(savedRunner)
        res.redirect('home')
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/buy-tshirt', (req, res) => {
    res.render('buy-tshirt')
})

module.exports = router