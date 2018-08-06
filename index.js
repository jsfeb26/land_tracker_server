const express = require("express");
const app = express();

// route handler for get request to '/'
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

// check environment to see if PORT is set
const PORT = process.env.PORT || 5000;

// tells node to listen to requests coming in on PORT
app.listen(PORT);
