const router = require('express').Router()
const Runner = require('../models/Order')

router.post('/buy-tshirt', async (req, res) => {
    if(req.body.student === 'no') {
        delete req.body.regNumber
    }
    console.log(req.body)
    const newRunner = new Runner(req.body)
    try {
        const savedRunner = await newRunner.save()
        res.status(200)
        res.redirect('/')
    } catch (err) {
        if(err.code === 11000){
            const duplicateKey = Object.keys(err.keyValue)[0]
            res.status(400).json({message: `${duplicateKey} ${err.keyValue[duplicateKey]} already exists`})
        }else{
            res.status(500).json({message: "Error saving data"})
        }
    }
})



router.get('/', (req, res) => {
    res.render('home')
})

router.get('/buy-tshirt', (req, res) => {
    res.render('buy-tshirt')
})

module.exports = router