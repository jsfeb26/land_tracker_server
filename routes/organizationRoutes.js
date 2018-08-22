const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Organization = mongoose.model("organizations");
const User = mongoose.model("users");

module.exports = app => {
  app.get("/api/user_organizations", requireLogin, async (req, res) => {
    const { user } = req;
    const fullUser = await User.findOne(user).populate("organizations");
    res.send(fullUser.organizations);
  });

  app.post("/api/organization", requireLogin, async (req, res) => {
    const {
      companyName,
      contactName,
      address,
      city,
      state,
      zipCode,
      phone,
      fax,
      email,
      website,
      deedTitling,
      deedType,
      docFee,
      lateFee,
      noteServicingFee,
      gracePeriod
    } = req.body;
    const { user } = req;

    const newOrganization = new Organization({
      companyName,
      contactName,
      address,
      city,
      state,
      zipCode,
      phone,
      fax,
      email,
      website,
      deedTitling,
      deedType,
      docFee,
      lateFee,
      noteServicingFee,
      gracePeriod,
      users: [user]
    });
    user.organizations.push(newOrganization);

    const validationResult = newOrganization.validateSync();
    if (validationResult) {
      // TODO: use validationResult.errors to send back more specific errors
      return res.status(422).send({ error: "Bad data" });
    }

    await Promise.all([newOrganization.save(), user.save()]);
    res.send(newOrganization);
  });
};
