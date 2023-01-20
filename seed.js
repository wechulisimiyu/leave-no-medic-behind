const mongoose = require("mongoose");
const Runner = require("./src/models/Order");
const dotenv = require("dotenv");

mongoose.set('strictQuery', true)

// loading the config files
dotenv.config({ path: "./config/config.env" });
const mongoUrl = process.env.DB_URL;

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to the db')
    })
    .catch((err) => {
        console.log(err)
    })

// try {
//   await mongoose.connect(mongoUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log("Connected to the db");
// } catch (err) {
//   console.log(err);
// }

const data = [
  {
    student: true,
    regNumber: "H13/2345/2022",
    tshirtType: "polo",
    tshirtSize: "medium",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "0712345678",
  },
  {
    student: true,
    regNumber: "H13/2346/2022",
    tshirtType: "round",
    tshirtSize: "large",
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "0712345679",
  },
  {
    student: false,
    tshirtType: "polo",
    tshirtSize: "small",
    name: "Bob Johnson",
    email: "bobjohnson@example.com",
    phone: "0712345680",
  },
  {
    student: true,
    regNumber: "H13/2347/2022",
    tshirtType: "round",
    tshirtSize: "medium",
    name: "Emma Williams",
    email: "emmawilliams@example.com",
    phone: "0712345681",
  },
  {
    student: false,
    tshirtType: "polo",
    tshirtSize: "large",
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    phone: "0712345682",
  },
];

const seedDb = async () => {
    await Runner.deleteMany({})
    await Runner.insertMany(data)
}

seedDb().then(() => {
    mongoose.connection.close()
})

console.log('done seeding')