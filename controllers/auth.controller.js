import { body, validationResult } from "express-validator";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/):
// At least one lowercase letter ((?=.*[a-z])).
// At least one uppercase letter ((?=.*[A-Z])).
// At least one digit ((?=.*\d)).
// At least one special character ((?=.*[@$!%*?&^])).
// Only allows specific characters [A-Za-z\d@$!%*?&^]+.
// Testing valid pass use: S2G^lPokMKau P@ssw0rd#1234
// Validate signup form

const saltRounds = 10;
const token_key = "my-token-key";

const validateSignup = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$#!%*?&^#]+$/
    )
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

const validateLogin = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("password is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
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
    const existingUser = await User.findOne({ username: req.body.username });
    let signupErrors = [];
    if (existingUser) {
      signupErrors.push({ msg: "Username already exists" });
      console.log("Email already exists");
      res.render("pages/signup", {
        title: "Signup page - Validation Failed",
        errors: signupErrors,
      });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      await newUser.save();

      console.log("User saved successfully");
      res.send("User saved successfully");
    }
  } catch (error) {
    console.log(error);
    res.send("An error occurred");
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const errors = validationResult(req);
  let auth = false;
  if (!errors.isEmpty()) {
    console.log(errors.array());
    res.render("pages/login", {
      title: "Login page - Validation Failed",
      errors: errors.array(),
    });
    return;
  }
  console.log(req.body.username);

  const user = await User.findOne({ username });
  let loginErrors = [];
  if (!user) {
    console.log("Invalid credentials: User not found");
    loginErrors.push({ msg: "Invalid credentials" });
  } else {
    console.log(username);
    console.log(password);
    console.log(user.password);
    bcrypt.compare(password, user.password).then((passwordMatch) => {
      console.log(passwordMatch);
      if (passwordMatch) {
        auth = true;
        console.log("Login successful");
      } else {
        console.log("Invalid password");
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (auth) {
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, token_key);

        //res.json({ token });
        res.cookie("token", token, { httpOnly: true });
        //res.send("Login successful");
        res.redirect("/");
      } else {
        res.render("pages/login", {
          title: "Login page - Validation Failed",
          errors: loginErrors,
        });
      }
    });
  }
};

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  //const authHeader = req.headers['authorization'];
  //const token = authHeader && authHeader.split(' ')[1];
  const token = req.cookies.token;

  if (!token) {
    //return res.status(401).json({ message: 'Unauthorized' });
    return res.redirect("/login");
  }

  jwt.verify(token, token_key, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

export {
  validateSignup,
  signupController,
  validateLogin,
  login,
  authenticateToken,
};
