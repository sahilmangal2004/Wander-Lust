const User = require("../models/user")

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs")
}

module.exports.signUp = async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);  // ✅ now this works
        }
        req.flash("success", "welcome to WanderLust!");
        return res.redirect("/listings");  // ✅ add return here
      });
    } catch (err) {
      req.flash("error", err.message);
      return res.redirect("/signup");  // ✅ add return here too
    }
}

module.exports.renderUserForm = (req, res) => {
    res.render("users/login.ejs")
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to WanderLust!")
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}

module.exports.logOut = (req, res) => {
    req.logout((err) => {
        if(err) {
            return next(err)
        }
        req.flash("success", "logged you out!")
        res.redirect("/listings")
    })
}

