const axios = require("axios");
const dotenv = require("dotenv");

// @desc get transaction status from the API
// @method GET
// @route /stkPush
// @access

const generateTransactionStatus = (response) => {
  const statusCode = response.StatusCode;
  const status = response.Status;
  const reference = response.Reference;

  if (statusCode === "88") {
    switch (status) {
      case "DuplicateTransaction":
        console.log(`Transaction ${reference} failed. Error: ${status}`);
        break;
      case "AmountTooLow":
        console.log(`Transaction ${reference} failed. Error: ${status}`);
        break;
      case "MaximumAmountExceeded":
        console.log(`Transaction ${reference} failed. Error: ${status}`);
        break;
      default:
        console.log(`Transaction ${reference} failed. Error: Unknown`);
        break;
    }
  } else if (statusCode === "2" || statusCode === "3" || statusCode === "4" || statusCode === "5") {
    const statusDescription = response.AdditionalParameters.StatusDescription;
    const telcoReference = response.AdditionalParameters.TelcoReference;

    switch (status) {
      case "AwaitingSettlement":
        console.log(`Transaction ${reference} is awaiting settlement.`);
        break;
      case "Completed":
        console.log(`Transaction ${reference} has completed successfully.`);
        if (statusCode === "3") {
          // Save successful transaction to database
          const transaction = {
            reference,
            status: statusCode,
            statusDescription,
            telcoReference,
            date: new Date(),
          };
          Response.create(transaction);
          console.log(`Transaction ${reference} has been saved to database.`);
        }
        break;
      case "Cancelled":
        console.log(`Transaction ${reference} has been cancelled by user. Error: ${statusDescription}`);
        break;
      case "Failed":
        console.log(`Transaction ${reference} has failed. Error: ${statusDescription}`);
        break;
      default:
        console.log(`Transaction ${reference} failed. Error: Unknown`);
        break;
    }
  }
};


const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters from the phone number
  const digitsOnly = phone.replace(/\D/g, "");

  // Check if the phone number starts with "254"
  if (digitsOnly.startsWith("254")) {
    return digitsOnly;
  } else if (digitsOnly.length === 9 && digitsOnly.startsWith("7")) {
    // If the phone number starts with "7" and is 9 digits long, assume it's a Kenyan number and add "254" at the beginning
    return `254${digitsOnly}`;
  } else {
    // Otherwise, return null to indicate that the phone number is invalid
    return null;
  }
};

module.exports = { initiateSTKPush, generateTransactionStatus };
