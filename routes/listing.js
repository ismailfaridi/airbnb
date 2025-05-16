const express = require("express");
const router = express.Router(); // Express Router

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js"); // Model

const { validateListing, isLoggedIn, isOwner } = require("../middleware.js"); // validate schema, check if the user is logged in, and is the owner or not

const listingController = require("../controllers/listing.js");

// Image Mechanism: FileUpload > Parse > Cloudinary > URL > Save in DB
if(process.env.NODE_ENV != "production") {
  require("dotenv").config();
  // console.log(process.env.MAP_TOKEN);
}

const { storage } = require("../cloudConfig.js");

const multer = require("multer"); // multer middleware for handling multipart/form-data, which is primarily used for uploading files.
const upload = multer({ storage }); // store files in cloudinary storage

// Router.route
router.route("/")
  .get(wrapAsync(listingController.index)) // Show All Listings
  .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing)); // Create New Listing

router.get("/new", isLoggedIn, listingController.renderNewForm); // Render New Listing Form

router.route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show Specific Listing
  .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing)) // Update Listing
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); // Delete Listing

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditListingForm));  // Render Edit Listing Form

// Exporting Listing Router
module.exports = router;