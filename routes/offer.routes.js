const express = require("express");
const { createOffer } = require('../controllers/offer.controller')


const app = express();

const router = express.Router();

router.get('/', (req, res) => {
    return res.send({
        Error: false,
        message: 'offer routes works'
    })
});

router.post('/create', createOffer);



exports.OffersRoutes = app.use("/offer", router);