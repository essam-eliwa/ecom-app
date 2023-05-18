import { Router } from "express";
import {
  validateSignup,
  signupController,
} from "../controllers/auth.controller.js";

const router = Router();

// GET home page
router.get("/", function (req, res, next) {
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

// login page
router.post("/login", function (req, res, next) {
  res.send("login: respond with a resource");
});

export default router;
