const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

const app = express();

// new GoogleStrategy() creates new instance of GoogleStrategy
// tell passport about new strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
    }
  )
);

// route handler for /auth/google
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// route handler for /auth/google/callback
app.get("/auth/google/callback", passport.authenticate("google"));

// check environment to see if PORT is set
const PORT = process.env.PORT || 5000;

// tells node to listen to requests coming in on PORT
app.listen(PORT);
