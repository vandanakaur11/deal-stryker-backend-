// dependencies
const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');

// modular functions
const { connectDatabase } = require("./db/index");
require('./utils/passport')

connectDatabase();

const app = express();

const PORT = process.env.PORT || 3040;

app.use(express.json({ extended: true }));

app.use(cors());

app.use(cookieSession({
    name: 'session',
    keys: ['deal-stryker-app'],
    maxAge: 48 * 60 * 60 * 100
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(morgan("dev"));

app.get("/api/v1/", (req, res) => {
    return res.send({
        Error: false,
        message: "health 100%",
    });
});

app.use("/api/v1", require("./routes/index"));

app.listen(PORT, () => {
    console.log("App is running on port:", PORT);
});
