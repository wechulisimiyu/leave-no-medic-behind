const Joi = require("joi");

// Joi schema for Donation model
const donationSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Please enter a valid email address",
  }),
  phone: Joi.string().required(),
  amount: Joi.number().required(),
});

// Joi schema for Order model
const orderSchema = Joi.object({
  student: Joi.string().required(),
  university: Joi.string().when("student", {
    is: "yes",
    then: Joi.string().valid("uon", "partner", "other").required(),
    otherwise: Joi.string().valid("").optional(),
  }),
  yearOfStudy: Joi.string().when("student", {
    is: "yes",
    then: Joi.string()
      .valid("I", "II", "III", "IV", "IVs", "V", "VI")
      .required(),
    otherwise: Joi.string().valid("").optional(),
  }),
  regNumber: Joi.string().when("student", {
    is: "yes",
    then: Joi.string().required(),
    otherwise: Joi.string().valid("").optional(),
  }),
  attending: Joi.string().required(),
  tshirtType: Joi.string().required(),
  tshirtSize: Joi.string().required(),
  quantity: Joi.number().required(),
  totalAmount: Joi.number().required(),
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Please enter a valid email address",
  }),
  phone: Joi.string().required(),
  nameOfKin: Joi.string().required(),
  kinNumber: Joi.string().required(),
  medicalCondition: Joi.string().required(),
  pickUp: Joi.string()
    .valid("kenyatta-national-hospital", "chiromo-campus")
    .optional(),
  confirm: Joi.string().required(),
});

const paymentSchema = Joi.object({
  phone: Joi.string().required().messages({
    "any.required": "Phone number is required",
  }),
  amount: Joi.number().required().messages({
    "any.required": "Amount is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Please enter a valid email address",
  }),
  confirmationMessage: Joi.string().required().messages({
    "any.required": "Confirmation message is required",
  }),
});

module.exports = {
  donationSchema,
  orderSchema,
  paymentSchema,
};
