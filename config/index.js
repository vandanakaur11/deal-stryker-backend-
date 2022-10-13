const path = require("path");

require("dotenv").config({
    path: process.env.NODE_ENV === "prod" ? path.resolve(".env") : path.resolve(".env.development"),
});

exports.config = {
    mongoDb_uri: process.env.mongoDb_uri,
    jwt_secret: process.env.jwt_secret,
    node_mailer_secret: process.env.node_mailer_key,
    google_client: process.env.google_oauth_clientID,
    google_secret: process.env.google_oauth_secret
};
