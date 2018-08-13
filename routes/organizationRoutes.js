const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Organization = mongoose.model("organizations");

module.exports = app => {
  app.post("/api/organization", requireLogin, async (req, res) => {
    const {
      name,
      address,
      city,
      state,
      zipCode,
      phone,
      fax,
      email,
      deedTitling,
      deedType,
      docFee,
      lateFee,
      noteServicingFee,
      gracePeriod
    } = req.body;

    const newOrganization = new Organization({
      name,
      address,
      city,
      state,
      zipCode,
      phone,
      fax,
      email,
      deedTitling,
      deedType,
      docFee,
      lateFee,
      noteServicingFee,
      gracePeriod,
      users: [req.user]
    });

    await newOrganization.save();
  });
};
