// Initialize Sample Data
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.log(err);
  });

// Initialize the DB with initial data
async function initDB() {
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj) => ({...obj, owner: "6824819847def08825789ca6"})); // {adding owner to default listings}
    await Listing.insertMany(initData.data);
    console.log("Data was initialized.");

    // console.log(initData.data[0]); // test
}

initDB();