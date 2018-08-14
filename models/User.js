const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
  organizations: [
    {
      type: Schema.Types.ObjectId,
      ref: "organizations"
    }
  ]
});

userSchema.virtual("organizationCount").get(function() {
  return this.organizations.length;
});

// creates Users Model Class
mongoose.model("users", userSchema);
