const { userRoutes } = require("./users.routes");
const { googleAuth } = require('./google.auth.routes');
const { OffersRoutes } = require('./offer.routes');


module.exports = [userRoutes, googleAuth, OffersRoutes];
