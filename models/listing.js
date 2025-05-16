const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  //   default: "https://images.unsplash.com/photo-1694878981856-7fb3b09598a5?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   set: (v) => { return v === "" ? "https://images.unsplash.com/photo-1694878981856-7fb3b09598a5?q=80&w=2065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v },
  // },
  image: {
    url: String,
    filename: String,
  },
  // category: {
  //   type: String,
  //   enum: ["mountains", "rooms", "farms", "arctic", "camping", "pools"],
  // },
  price: {
    type: Number,
    required: true,
    min: 100,
  },
  country: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  geometry: { // For storing location coordinates in GEOJSON format.
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  reviews: [ // Array of Documents
    {
      type: Schema.Types.ObjectId, // Storing id of review
      ref: "Review"                // Id from Review collection
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Mongoose post Middleware for deleting listing. (findByIdAndDelete internally call the findOneAndDelete)
listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;