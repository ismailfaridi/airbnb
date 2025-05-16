const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => { // validateReview as middleware
  // console.log(req.params.id);
  const listing = await Listing.findById(req.params.id);
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "New review added!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // delete review id from listing reviews array
  await Review.findByIdAndDelete(reviewId); // delete from review collection

  req.flash("success", "Review deleted.");
  res.redirect(`/listings/${id}`);
};