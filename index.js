const express = require('express')
const jwt = require('jsonwebtoken');
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const flash = require("connect-flash");
const session = require("express-session")
const ejsMate = require('ejs-mate')
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override')
const homeRoute = require('./src/routes/homeRoutes')
const lipaRoute = require('./src/routes/paymentRoutes')
const adminRoute = require('./src/routes/userRoutes')
const mailRoute = require('./src/routes/mailRoutes')

mongoose.set('strictQuery', true)

// loading the config files
dotenv.config({ path: './config/config.env' })

// connect the db
connectDB()

const app = express()

// middlewares
app.use(express.json())
app.use(cors())


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'))

// Body parser
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// const sessionStore = new MongoStore({
//     url: process.env.DB_URL
//   })

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
      }),
    expires: new Date(Date.now() + (20 * 60 * 1000))
  }));

app.use(flash());


app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
     const accessToken = req.headers["x-access-token"];
     const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
     // Check if token has expired
     if (exp < Date.now().valueOf() / 1000) { 
      return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
     } 
     res.locals.loggedInUser = await User.findById(userId); next(); 
    } else { 
     next(); 
    } 
   });

app.use("/", homeRoute)
app.use("/payment", lipaRoute)
app.use("/mail", mailRoute)
app.use("/admin", adminRoute)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Serving at http://localhost:${port}, and the admin serving at http://localhost:${port}/admin`)
}) 