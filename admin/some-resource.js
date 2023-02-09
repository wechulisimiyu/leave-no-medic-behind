const { Components } = require("./components");

const SomeResource = {
  resources: [Order, Admin, Pickup, Tshirt, Mpesa], // database model
  options: {
    properties: {
      someText: {
        type: "string",
        components: {
          edit: Components.MyInput, // this is our custom component
        },
      },
    },
  },
}

module.exports = SomeResource
