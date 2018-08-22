const mongoose = require("mongoose");
const get = require("lodash.get");
const XLSX = require("xlsx");

const keys = require("../config/keys");
const Lob = require("lob")(keys.lobSecretKey);

const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");

const Parcel = mongoose.model("parcels");
const Organization = mongoose.model("organizations");

const fields = [
  { name: "parcelId", match: "PARCEL_ID" },
  { name: "ownerName", match: "OWNER_NAME" },
  { name: "ownerAddress", match: "OWNER_ADDRESS" },
  { name: "ownerCity", match: "OWNER_CITY" },
  { name: "ownerState", match: "OWNER_STATE" },
  { name: "ownerZip", match: "OWNER_ZIP" },
  { name: "parcelSize", match: "PARCEL_SIZE" },
  { name: "assessedValue", match: "ASSESSED_VALUE" },
  { name: "taxesDue", match: "TAXES_DUE" },
  { name: "offer", match: "OFFER" },
  { name: "legalDescription", match: "LEGAL_DESCRIPTION" }
];

module.exports = app => {
  app.get("/api/parcels", requireLogin, async (req, res) => {
    const orgId = req.query.orgId;
    const organization = await Organization.findById(orgId).populate({
      path: "parcels"
    });
    res.send(organization.parcels);
  });

  app.get("/api/parcels/send/offer", requireLogin, async (req, res) => {
    const parcelId = req.query.parcelId;
    const orgId = req.query.orgId;

    const organization = await Organization.findById(orgId);
    const { companyName, address, city, state, zipCode, fax, email, phone, website } = organization;

    // const parcel = await Parcel.findOne({ parcelId, organization });
    const parcel = await Parcel.findById(parcelId);
    const {
      parcelSize,
      countyName,
      ownerName,
      ownerAddress,
      ownerCity,
      ownerState,
      ownerZip,
      refNumber,
      offer
    } = parcel;

    const lobRes = await Lob.letters.create({
      description: `Offer Letter for ${refNumber}`,
      to: {
        name: ownerName,
        address_line1: ownerAddress,
        address_city: ownerCity,
        address_state: ownerState,
        address_zip: ownerZip,
        address_country: "US"
      },
      from: {
        name: companyName,
        address_line1: address,
        address_city: city,
        address_state: state,
        address_zip: zipCode,
        address_country: "US"
      },
      file: keys.lobOfferLetterTemplate,
      merge_variables: {
        companyName,
        address,
        city,
        state,
        zipCode,
        ownerName,
        ownerAddress,
        ownerCity,
        ownerState,
        ownerZip,
        refNumber,
        parcelId,
        parcelSize,
        countyName,
        offer,
        offerEndDate: "2018-12-31",
        fax,
        email,
        phone,
        website
      },
      color: false
    });
    console.log("lob res", lobRes);

    // change status of parcel to sent
    res.send(parcel);
  });

  app.post("/api/parcel", requireLogin, requireCredits, async (req, res) => {
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

  app.post("/api/parcels", requireLogin, requireCredits, async (req, res) => {
    let { organizationId, countyName, countyState } = req.body;
    const organization = await Organization.findById(organizationId);

    const parcelFileData = get(req, "files.parcelFile.data");

    if (!organization) {
      return res.status(400).send({ error: "No Excel data found" });
    } else if (!countyName) {
      return res.status(400).send({ error: "County is required" });
    } else if (!countyState) {
      return res.status(400).send({ error: "State is required" });
    } else if (!parcelFileData) {
      return res.status(400).send({ error: "No Excel data found" });
    }

    countyName = countyName.toLowerCase().trim();
    const county = organization.counties.find(county => county.name === countyName);
    let lastRefNumber = county ? county.lastRefNumber : 0;

    // need to get file data and use type array
    // https://github.com/SheetJS/js-xlsx#parsing-workbooks
    const workbook = XLSX.read(parcelFileData, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const newParcels = [];

    worksheet.forEach(row => {
      lastRefNumber++;
      const parcel = new Parcel({
        refNumber: `${countyName}-${lastRefNumber}`,
        countyName,
        countyState,
        createdBy: req.user,
        organization,
        dateCreated: Date.now()
      });

      fields.forEach(field => {
        parcel[field.name] = row[field.match];
      });

      // validate record
      newParcels.push(parcel);
      organization.parcels.push(parcel);
    });

    if (!county) {
      organization.counties.push({ name: countyName, lastRefNumber });
    } else {
      county.lastRefNumber = lastRefNumber;
    }

    await Promise.all([Parcel.collection.insert(newParcels), organization.save()]);
  });
};
