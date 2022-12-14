const mongoose = require("mongoose");
const { config } = require("../config/index");

exports.connectDatabase = async () => {
    try {
        await mongoose.connect(config.mongoDb_uri), { useNewUrlParser: true, useUnifiedTopology: true, useCreacteIndex: true };
        console.log("Mongo Db connected sucessfully!");
    } catch (error) {
        console.log(`Unable to connect database: ${error.message}`);
    }
};
