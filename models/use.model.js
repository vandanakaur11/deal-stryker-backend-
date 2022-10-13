const mongoose = require("mongoose");

const scheema = mongoose.Schema;

const UserScheema = new scheema(
    {
        username: {
            type: String,
            require: true,
            trim: true,
        },
        password: {
            type: String,
            require: true,
            minLength: 6,
            trim: true,
        },
        offerCounter: {
            type: Number,
            require: true,
            default: 0
        },
        email: {
            type: String,
            require: true,
            trim: true,
            unique: true,
        },
        otp: {
            type: String,
        },
        otpExpiry: {
            type: Date
        }
    },
    { timestamps: true },
);

exports.userModel = mongoose.model("users", UserScheema);
