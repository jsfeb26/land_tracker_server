const mongoose = require("mongoose");
const { Schema } = mongoose;

const organizationSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
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
  Phone: String,
  Fax: String,
  email: String,
  deedTitling: String,
  deedType: String,
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

// creates Organizations Model Class
mongoose.model("organizations", organizationSchema);
