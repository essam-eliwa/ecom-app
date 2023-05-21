import { body, validationResult } from "express-validator";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

// matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/):
// At least one lowercase letter ((?=.*[a-z])).
// At least one uppercase letter ((?=.*[A-Z])).
// At least one digit ((?=.*\d)).
// At least one special character ((?=.*[@$!%*?&^])).
// Only allows specific characters [A-Za-z\d@$!%*?&^]+.
// Testing valid pass use: S2G^lPokMKau
// Validate signup form
const validateSignup = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]+$/
    )
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

const signupController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("pages/signup", {
      title: "Signup page - Validation Failed",
      errors: errors.array(),
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const isMatch = await bcrypt.compare(
      req.body.confirmPassword,
      hashedPassword
    );

    if (isMatch) {
      console.log("Passwords match");
      res.send("Signup successful");
    } else {
      console.log("Passwords do not match");
      res.send("Passwords do not match");
    }
  } catch (error) {
    console.log(error);
    res.send("An error occurred");
  }
};

export { validateSignup, signupController };

