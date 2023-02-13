const { Components } = require("./components")
const { Database, Resource } = require('@adminjs/mongoose')
const Order = require('../src/models/Order')
const Tshirt = require('../src/models/Tshirt')
const Admin = require('../src/models/Admin')
const Pickup = require('../src/models/Pickup')
const Mpesa = require('../src/models/Mpesa')

const Schemas = {
  resources: [Order, Admin, Pickup, Tshirt, Mpesa], // database model
  options: {
    properties: {
      someText: {
        type: "string",
        components: {
          edit: Components.Dashboard, // this is our custom component
        },
      },
    },
  },
}

module.exports = Schemas
