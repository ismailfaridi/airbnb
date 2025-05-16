const Listing = require("./models/listing");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js"); // schema validation (JOI)

// Validate Schema (we can add wrong things from hoppscotch that's why)
module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if(error) {
    const errMsg = error.details.map((el) => el.message.join(","));
    throw new ExpressError(400, error);
  } else {
    next();
  }
}

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if(error) {
    const errMsg = error.details.map((el) => el.message.join(","));
    throw new ExpressError(400, error);
  } else {
    next();
  }
}

module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.user); // show loged0in user details
  // console.log(req); // print more details
  // console.log(req.path, " .. ", req.originalUrl);

  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // storing original url, so if user loged-in then redirect to same page where he got error to login.

    req.flash("error", "Please login to perform the action.");
    return res.redirect("/login");
  }
  next();
};

// passport will reset the cookies so we want to save this for later use. To do this we save in res.locals.
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.curUser._id)) { // equals() safely compare two mongoDB objectIds.
    req.flash("error", "You don't have permission.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.curUser._id)) { // equals() safely compare two mongoDB objectIds.
    req.flash("error", "You don't have permission.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};