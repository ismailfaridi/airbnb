const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo"); // Mongo Session Store for production

require('dotenv').config();

// Auth
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Express Router
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js")

app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const PORT = 8080;
// const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";
const MONGO_URL = process.env.ATLASDB_URL;

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

// Express Session (store session info)
const sessionOptions = {
  store, // store session related info in ATLAS DB
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  // overriding default cookie attributes
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // expire after 7 days in miliseconds
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true // enhance security (prevent XSS attacks)
  }
}

app.use(session(sessionOptions));

// AUTH: To use passport we need express-session.
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // use static authenticate method of model in LocalStrategy

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect Flash (success & eror messages)
app.use(flash());

app.use((req, res, next) => {
  // Middleware for Making Flash Messages Available to Templates. res.locals.var_name will make variables accessible in templates rendered with res.render.
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  res.locals.curUser = req.user; // store current user info in locals for accessing
  
  next();
});

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter); // To send :id to review.js to work properly we need to add {mergeParams: true} in express.Router in review.js file.
app.use("/", userRouter);

// Route Handler
app.all("{*splat}", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).render("listings/error.ejs", { message });
});

// Server Listener
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});

// Connecting to MongoDB
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Successfully connected to MongoDB."); // ATLAS DB
  })
  .catch((err) => {
    console.log(err);
  });