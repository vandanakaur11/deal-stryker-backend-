const passport = require("passport");
const googleOAuthStrategy = require('passport-google-oauth20').Strategy;
const { config } = require('../config/index');


passport.use(new googleOAuthStrategy({
    clientID: config.google_client,
    clientSecret: config.google_secret,
    callbackURL: 'http://localhost:3040/api/v1/auth/google/callback',
    passReqToCallback: true
}, function (accessToken, refreshToken, profile, email, done) {
    console.log(email)
    return done(null, email);
}
))

passport.serializeUser((user, done) => {
    return done(null, user);
})

passport.deserializeUser((user, done) => {
    return done(null, user);
})