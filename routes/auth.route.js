import { Router } from "express";
import {
  validateSignup,
  signupController,
  validateLogin,
  login,
  authenticateToken,
} from "../controllers/auth.controller.js";

const router = Router();

// GET home page
router.get("/", authenticateToken, function (req, res, next) {
  console.log("index.js: GET /");
  res.render("pages/index", {
    title: "SWE230: Express Demo App",
    message: "WE LOVE MERN STACK",
  });
});

// GET home page
router.get("/signup", function (req, res, next) {
  console.log("index.js: GET /");
  res.render("pages/signup", { title: "Signup page", errors: [] });
});

// signup page
router.post("/signup", validateSignup, signupController);

// GET login page
router.get("/login", function (req, res, next) {
  console.log("login: GET /login");
  res.render("pages/login", { title: "Login page", errors: [] });
});

// POST login page
router.post("/login", validateLogin, login);

export default router;
