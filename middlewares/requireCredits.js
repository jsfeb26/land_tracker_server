const featureFlags = require("../config/featureFlags");

// next is a function that we call when function is complete
// next allows you to pass request off to next middleware or function in chain
module.exports = (req, res, next) => {
  if (featureFlags.requireCredits && req.user.credits < 1) {
    return res.status(403).send({ error: "Not enough credits!" });
    // by not calling next we're stopping this request here
  }

  next();
};
