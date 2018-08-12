const mongoose = require("mongoose");
const { Schema } = mongoose;

const parcelSchema = new Schema({
  parcelId: String,
  refNumber: String,
  parcelSize: Number,
  organization: { type: Schema.Types.ObjectId, ref: "organizations" },
  createdBy: { type: Schema.Types.ObjectId, ref: "users" },
  dateCreated: Date
});

// creates Parcels Model Class
mongoose.model("parcels", parcelSchema);
