const mongoose = require('mongoose');

const schema = mongoose.Schema;


const OfferSchema = new schema(
    {
        make: {
            type: String,
            require: true,
            trim: true,
        },
        color: {
            type: String,
            trim: true,
            require: true,
        },
        model: {
            type: String,
            require: true,
            trim: true,
        },
        variant: {
            type: String,
            trim: true,
            require: true
        },
        year: {
            type: String,
            require: true,
            trim: true,
        },
        username: {
            type: String,
            trim: true,
            require: true
        },
        userID: {
            type: String,
            trim: true
        },
        zipCode: {
            type: String,
            trim: true,
            require: true
        },
        travelRadius: {
            type: String,
            trim: true,
            require: true
        },
        FP: {
            type: String,
            trim: true,
            require: true
        }
    },
    { timestamps: true },
);

exports.offerModel = mongoose.model('Offers', OfferSchema);