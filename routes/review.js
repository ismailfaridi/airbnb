const express = require("express");
const router = express.Router({mergeParams: true}); // mergeParams:	Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.

const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

// Models
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const reviewController = require("../controllers/review.js");

// add review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// delete review
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

// Exporting Router
module.exports = router;