const passport = require('passport');
const express = require('express');
const { config } = require('../config/index');


const app = express();

const router = express.Router();

router.get('/', (req, res) => {
    return res.send({
        Error: false,
        message: "google auth route work fine"
    })
});

router.get("/google", passport.authenticate("google", { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {

    successRedirect: 'http://localhost:19002/HomeScreen',
    failureRedirect: 'http://localhost:19002/'

}));




exports.googleAuth = app.use('/auth', router)