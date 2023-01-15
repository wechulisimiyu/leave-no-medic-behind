const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const homeRoute = require('./src/routes/homeRoutes')
const adminRoute = require('./src/routes/adminRoutes')

mongoose.set('strictQuery', true)

// loading the config files
dotenv.config({ path: './config/config.env' })

// connect the db
connectDB()

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'))

// Body parser
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

app.use("/", homeRoute)
app.use("/admin", adminRoute)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Serving at port ${port}`)
});