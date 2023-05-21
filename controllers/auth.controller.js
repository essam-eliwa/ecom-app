import { body, validationResult } from "express-validator";

// matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/):
// At least one lowercase letter ((?=.*[a-z])).
// At least one uppercase letter ((?=.*[A-Z])).
// At least one digit ((?=.*\d)).
// At least one special character ((?=.*[@$!%*?&])).
// Only allows specific characters [A-Za-z\d@$!%*?&]+.

// Validate signup form
const validateSignup = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

// Process signup form
const signupController = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("pages/signup", {
      title: "Signup page - Validation Failed",
      errors: errors.array(),
    });
  } else {
    // Process the signup logic
    res.send("Signup successful");
  }
};

export { validateSignup, signupController };
