const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/lnmb'

const connectDB = async () => {
    try {
      const db = await mongoose.connect(dbUrl)
      console.log(`Database connected: ${db.connection.host}`)
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }

module.exports = connectDB