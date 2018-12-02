const mongoose = require('mongoose');
const { Schema } = mongoose;

const parcelSchema = new Schema({
  parcelId: { type: String, required: [true, 'Parcel Id required'] },
  parcelSize: Number,
  legalDescription: String,
  assessedValue: Number,
  taxesDue: Number,
  countyName: String,
  countyState: String,

  ownerName: { type: String, required: [true, 'Owner Name is required'] },
  ownerAddress: { type: String, required: [true, 'Owner Address is required'] },
  ownerAddress2: String,
  ownerCity: { type: String, required: [true, 'Owner City is required'] },
  ownerState: { type: String, required: [true, 'Owner City is required'] },
  ownerZip: { type: String, required: [true, 'Owner City is required'] },

  refNumber: String,
  offer: Number,

  createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
  organization: { type: Schema.Types.ObjectId, ref: 'organizations' },
  dateCreated: { type: Date, default: Date.now },

  status: {
    type: String,
    enum: [
      'Open',
      'Sent',
      'Done',
      'Response Received',
      'Active',
      'Undeliverable'
    ],
    default: 'Open'
  },
  stage: {
    type: String,
    enum: ['New', 'Due Diligence', 'Closing', 'Marketing', 'Sold'],
    default: 'New'
  }
});

// creates Parcels Model Class
mongoose.model('parcels', parcelSchema);
