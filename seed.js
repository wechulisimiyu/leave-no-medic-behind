const mongoose = require("mongoose");
const Runner = require("./src/models/Order");
const dotenv = require("dotenv");

mongoose.set("strictQuery", true);

// loading the config files
dotenv.config({ path: "./config/config.env" });
const mongoUrl = process.env.DB_URL;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the db");
  })
  .catch((err) => {
    console.log(err);
  });

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
    student: "yes",
    regNumber: "h02/12345/2019",
    tshirtType: "polo",
    tshirtSize: "medium",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+254712345678"
  },
  {
    student: "yes",
    regNumber: "v02/12345/2019",
    tshirtType: "polo",
    tshirtSize: "large",
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "+254712345679"
  },
  {
    student: "no",
    tshirtType: "round",
    tshirtSize: "small",
    name: "Bob Johnson",
    email: "bobjohnson@example.com",
    phone: "+254712345680"
  },
  {
    student: "yes",
    regNumber: "i02/12345/2019",
    tshirtType: "polo",
    tshirtSize: "medium",
    name: "Emily Smith",
    email: "emilysmith@example.com",
    phone: "+254712345681"
  },
  {
    student: "no",
    tshirtType: "round",
    tshirtSize: "large",
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    phone: "+254712345682"
  },
  {
    student: "yes",
    regNumber: "h02/12345/2018",
    tshirtType: "polo",
    tshirtSize: "small",
    name: "Jessica Williams",
    email: "jessicawilliams@example.com",
    phone: "+254712345683"
  },
  {
    student: "no",
    tshirtType: "polo",
    tshirtSize: "medium",
    name: "James Garcia",
    email: "jamesgarcia@example.com",
    phone: "+254712345684"
  }
  ,
  {
    student: "yes",
    regNumber: "v02/12345/2018",
    tshirtType: "round",
    tshirtSize: "large",
    name: "Emily Davis",
    email: "emilydavis@example.com",
    phone: "+254712345685"
  },
  {
    student: "yes",
    regNumber: "i02/12345/2017",
    tshirtType: "polo",
    tshirtSize: "small",
    name: "Michael Miller",
    email: "michaelmiller@example.com",
    phone: "+254712345686"
  },
  {
    student: "no",
    tshirtType: "round",
    tshirtSize: "medium",
    name: "Brian Martinez",
    email: "brianmartinez@example.com",
    phone: "0785348445"
  }
];

const seedDb = async () => {
  await Runner.deleteMany({});
  await Runner.insertMany(data);
  console.log("done seeding");
};

seedDb().then(() => {
  mongoose.connection.close();
});
