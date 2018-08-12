const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const keys = require("./config/keys");
require("./models/User");
require("./models/Organization");
require("./models/Parcel");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

// these are middlewares that allow you to modify request before it's sent off
// to route handlers
app.use(bodyParser.json()); // parses request body
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
); // adds cookie data to req.session so passport can use it
app.use(cors());
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/organizationRoutes")(app);
require("./routes/parcelRoutes")(app);

// handle client side routing when in production
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets (e.g. main.js file, or main.css file)
  app.use(express.static("client/build"));

  // Express will serve up the index.html file if it doesn't recognize the route
  // this is the catch all case after all other routes fail
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000; // check environment to see if PORT is set
app.listen(PORT); // tells node to listen to requests coming in on PORT
