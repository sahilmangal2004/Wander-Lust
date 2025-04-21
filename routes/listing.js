const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// List all listings & create new listing
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        validateListing,
        upload.single("listing[image]"),
        wrapAsync(listingController.createListing)
    );

// Search Route
router.get("/search", async (req, res) => {
    const query = req.query.q;
    try {
        const listings = await Listing.find({
            title: { $regex: query, $options: "i" }
        });
        res.render("listings/index", { allListings: listings });
    } catch (err) {
        console.error(err);
        res.redirect("/listings");
    }
});

// Filter by category using controller
router.get("/filter", wrapAsync(listingController.filterByCategory));

// New listing form route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show, Update, Delete listing by ID
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// Edit listing form route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
