const { offerModel } = require('../models/index')
const { userModel } = require('../models/index')




exports.createOffer = async (req, res) => {

    const { make, color, model, variant, year, username, zipCode, travelRadius, FP, userID } = req.body;

    if (!make || !color || !model || !variant || !year || !username || !userID || !zipCode || !travelRadius || !FP) {
        return res.send({
            Error: true,
            message: "Please provide All required fields!"
        })
    }

    try {

        const user = await userModel.findOne({
            _id: userID
        })

        if (!user) {
            return res.send({
                Error: true,
                message: 'something went wrong'
            })
        }

        let currentOffer = user.offerCounter;

        if (currentOffer < 3) {

            currentOffer++;

            const checkOffer = await offerModel.findOne({ make, color, model, variant, year })

            if (checkOffer) {
                return res.send({
                    Error: true,
                    message: 'offer already exsist'
                })
            }
            const user = await userModel.findOneAndUpdate({
                _id: userID
            }, { offerCounter: currentOffer })


            const createOffer = await offerModel.create(req.body);

            createOffer.save();

            return res.send({
                Error: false,
                message: createOffer
            });
        } else {
            return res.send({
                Error: true,
                message: 'offer limit exceed '
            })
        }


    } catch (error) {
        return res.send({
            Error: true,
            message: `internal server error: ${error.message}`
        })
    }

}

