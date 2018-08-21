const mongoose = require("mongoose");
const { Schema } = mongoose;

const CountySchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  lastRefNumber: { type: Number, default: 0 }
});

const organizationSchema = new Schema({
  companyName: { type: String, required: [true, "Name is required"] },
  contactName: String,
  address: String,
  city: String,
  state: {
    type: String,
    validate: {
      validator: state => state.length === 2,
      message: "State must be 2 characters"
    }
  },
  zipCode: String,
  phone: String,
  fax: String,
  email: String,
  website: String,
  deedTitling: String,
  deedType: {
    type: String,
    enum: ["Warranty", "Special Warranty", "Quit Claim"]
  },
  docFee: Number,
  lateFee: Number,
  noteServicingFee: Number,
  gracePeriod: Number,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  counties: [CountySchema],
  parcels: [
    {
      type: Schema.Types.ObjectId,
      ref: "parcels"
    }
  ]
});

organizationSchema.virtual("userCount").get(function() {
  return this.users.length;
});
organizationSchema.virtual("parcelCount").get(function() {
  return this.parcels.length;
});

// creates Organizations Model Class
mongoose.model("organizations", organizationSchema);
