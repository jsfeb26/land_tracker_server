const mongoose = require("mongoose");
const get = require("lodash.get");
const XLSX = require("xlsx");
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
    // need to get file data and use type array
    // https://github.com/SheetJS/js-xlsx#parsing-workbooks
    // Browser file upload form element
    const { organizationId, county, state } = req.body;
    const organization = await Organization.findById(organizationId);
    const fileData = get(req, "files.file.data");

    if (!organization) {
      return res.status(400).send({ error: "No Excel data found" });
    } else if (!county) {
      return res.status(400).send({ error: "County is required" });
    } else if (!state) {
      return res.status(400).send({ error: "State is required" });
    } else if (!fileData) {
      return res.status(400).send({ error: "No Excel data found" });
    }

    const workbook = XLSX.read(fileData, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const parcelUploadAttemptCount = worksheet.length;
    const newParcels = [];

    worksheet.forEach(row => {
      let parcel = new Parcel({
        // refNumber: String,
        createdBy: req.user,
        organization,
        dateCreated: Date.now()
      });

      fields.forEach(field => {
        parcel[field.name] = row[field.match];
      });

      // validate record
      newParcels.push(parcel);
    });

    organization.parcels.concat(newParcels);
    await Promise.all([Parcel.collection.insert(newParcels), organization.save()]);
  });
};
