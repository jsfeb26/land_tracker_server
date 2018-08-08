const express = require("express");
require("./services/passport");

const app = express();
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000; // check environment to see if PORT is set
app.listen(PORT); // tells node to listen to requests coming in on PORT
