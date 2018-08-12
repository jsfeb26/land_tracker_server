const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Parcel = mongoose.model("parcels");
const Organization = mongoose.model("organizations");

module.exports = app => {
  app.post("/api/parcel", requireLogin, requireCredits, async (req, res, done) => {
    const { parcelId, parcelSize, organizationId } = req.body;

    const organization = await Organization.findById(organizationId);
    const parcel = new Parcel({
      // refNumber: String,
      parcelId,
      parcelSize,
      organization,
      createdBy: req.user,
      dateCreated: Date.now()
    });
    organization.parcels.push(parcel);

    await Promise.all([parcel.save(), organization.save()]);
  });
};
