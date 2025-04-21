const Listing = require("./models/listing.js")
const Review = require("./models/review.js")
const { listingSchema, reviewSchema} = require("./schema.js")
const ExpressError = require("./utils/ExpressError.js")

module.exports.isLoggedIn = (req, res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "you must be logged in to create listing!")
        return res.redirect("/login")
    }
    next()
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}

module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
        let listing = await Listing.findById(id);  // await here!
    
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }
    
        if (!listing.owner.equals(res.locals.currUser._id)) {
            req.flash("error", "You are not the owner of this listing.");
            return res.redirect(`/listings/${id}`);
        }

        next()
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body)
    console.log(error);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errmsg);
    } else {
        next()
    }

}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body)
    console.log(error);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errmsg);
    } else {
        next()
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let { reviewId, id } = req.params;
    let review = await Review.findById(reviewId);  // it should be review, not listing

    if (!review) {
        req.flash("error", "Review not found.");
        return res.redirect(`/listings/${id}`);
    }

    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You did not create this review.");
        return res.redirect(`/listings/${id}`);
    }

    next();
}