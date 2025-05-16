const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

// Router.route
router.route("/signup")
  .get(userController.renderSignupForm)    // Render Sign-Up Form
  .post(wrapAsync(userController.signup)); // Signup the user

router.route("/login")
  .get(userController.renderLoginForm) // Render Login Form
  // middleware to authenticate
  // saveRedirectUrl is to save the last url to redirect the user, even after the authenticate new user.
  .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true, }), userController.login); // Login User

router.get("/logout", isLoggedIn, userController.logout); // Logout User

module.exports = router;