const axios = require("axios");
const router = require("express").Router();

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

module.exports = router;
