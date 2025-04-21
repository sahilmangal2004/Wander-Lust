const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync")
const passport = require("passport")
const flash = require("connect-flash")
const { saveRedirectUrl } = require("../middleware.js")
const userController = require("../controllers/user.js")

router.route("/signup")
  .get(userController.renderSignUpForm)
  .post(wrapAsync(userController.signUp))

router.route("/login")
  .get(userController.renderUserForm)
  .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login)

router.get("/logout", userController.logOut)

module.exports = router