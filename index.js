const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./services/passport");
require("./models/User");

mongoose.connect(keys.mongoURI);

const app = express();
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000; // check environment to see if PORT is set
app.listen(PORT); // tells node to listen to requests coming in on PORT
