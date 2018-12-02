// next is a function that we call when function is complete
// next allows you to pass request off to next middleware or function in chain
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
    // by not calling next we're stopping this request here
  }

  next();
};
