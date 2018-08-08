const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// creates Users Model Class
mongoose.model("users", userSchema);
