if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError.js")
const flash = require("connect-flash")
const passport = require("passport")
const LocalSrategy = require("passport-local")
const User = require("./models/user.js")
const expressLayouts = require('express-ejs-layouts');

const session = require('express-session');
const MongoStore = require('connect-mongo');

app


const port = process.env.PORT || 8080


const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")



const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set('layout', 'layouts/boilerplate');


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname, "public")))

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
})

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err)
})

const sessionOptions= {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000*60*60*24*3,
        maxAge: 1000*60*60*24*3,
        httpOnly: true
    },
}
// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
// });

app.use(session(sessionOptions))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalSrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user
    next()
})

app.use("/listings", listingRouter)
app.use("/listings/:id/reviews", reviewRouter)
app.use("/", userRouter)

app.get("/", (req, res) => {
    res.redirect("/listings");
});

// 404 handler
app.use("*", (req, res, next) => {
    const err = new Error("Page Not Found");
    err.statusCode = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    if (!err.message) err.message = message;
    res.status(statusCode).render("listings/error.ejs", { err });
});

app.listen(port, () => {
    console.log("server is listening to port 8080");
});