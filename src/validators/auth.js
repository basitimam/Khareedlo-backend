const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character long"),
  check("phonenumber").notEmpty().withMessage("Phone number is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("province").notEmpty().withMessage("Province is required"),
  check("country").notEmpty().withMessage("Country is required"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
