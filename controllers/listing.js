const Listing = require("../models/listing.js");
// Geocoding with mapbox
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner"); // nested populate author with reviews
  if (!listing) {
    req.flash("error", "Listing doesn't exist.");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  // Geocoding for getting coordinates
  const coordinates = await geocodingClient.forwardGeocode({ query: req.body.listing.location, limit: 1 }).send();
  // console.log(coordinates.body.features[0].geometry);  

  // Uploaded Image URL & Name from Cloudinary
  const url = req.file.path;
  const filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = coordinates.body.features[0].geometry;
  await newListing.save();

  req.flash("success", "New Listing Created!"); // create flash
  res.redirect("/listings");
};

module.exports.renderEditListingForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing doesn't exist.");
    return res.redirect("/listings");
  }

  const originalImage = listing.image.url;
  const lowQualityImage = originalImage.replace("/upload", "/upload/w_250");

  res.render("listings/edit.ejs", { listing, lowQualityImage });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });

  if(typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id); // also call post mongoose middleware to delete reviews. (models>listing.js)
  req.flash("success", "Listing Deleted.");
  res.redirect("/listings");
};