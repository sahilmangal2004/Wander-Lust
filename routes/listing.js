const express = require("express")
const wrapAsync = require("../utils/wrapAsync.js")
const router = express.Router()
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js")
const listingController = require("../controllers/listing.js")
const multer = require("multer")
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })

router.route("/")
  .get((req, res) => {
    res.send("Hello, Welcome to WanderLust!");
  })
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, validateListing, upload.single("listing[image]"), wrapAsync(listingController.createListing))


// Search Route
router.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const listings = await Listing.find({
      title: { $regex: query, $options: 'i' }
    });
    res.render('listings/index', { allListings: listings });
  } catch (err) {
    console.error(err);
    res.redirect('/listings');
  }
});

// Filter by category
router.get('/filter', async (req, res) => {
  const category = req.query.category;
  try {
    const listings = await Listing.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } });
    res.render('listings/index', { allListings: listings });
  } catch (err) {
    console.error(err);
    res.redirect('/listings');
  }
});

router.get("/filter", listingController.filterByCategory);

// //New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));





module.exports = router
