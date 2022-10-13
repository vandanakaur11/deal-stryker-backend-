const { userModel } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');

const { config } = require('../config/index');
const { sendMail } = require('../utils/nodemailer')

exports.signUpUser = async (req, res) => {

    let { username, password, email } = req.body

    if (!username || !password || !email) {
        return res.send({
            Error: true,
            message: "Please provide all required fields",
        });
    }

    try {
        const isUser = await userModel.findOne({ email: email });

        if (isUser) {
            return res.send({
                Error: true,
                message: "account already created by this email",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPasword = await bcrypt.hash(password, salt);

        const createUser = await userModel.create({
            email,
            password: hashPasword,
            username: username,
        });

        createUser.save();

        return res.send({
            Error: false,
            message: "user created successfully",
        });
    } catch (error) {
        return res.send({
            Error: true,
            message: `internal server error: ${error.message}`,
        });
    }
};


exports.login = async (req, res) => {

    let { email, password } = req.body;

    if (!email || !password) {
        return res.send({
            Error: true,
            message: "please provide all require fields!"
        })
    }

    try {

        const findUser = await userModel.findOne({
            email: email
        }).lean().exec();

        if (!findUser) {
            return res.send({
                Error: true,
                message: "User not found!"
            });
        }

        const passwordIsmatch = await bcrypt.compare(password, findUser.password);

        if (!passwordIsmatch) {
            return res.send({
                Error: true,
                message: 'please provide correct password'
            })
        }

        const params = {
            id: findUser._id,
            email: findUser.email
        }

        const token = jwt.sign(params, config.jwt_secret);

        return res.send({
            Error: false,
            message: {
                token: token,
                email: findUser.email,
                id: findUser._id
            }
        })


    } catch (error) {
        return res.send({
            Error: true,
            message: `internal server error: ${error.message}`
        })
    }
}

exports.requestOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.send({
            Error: true,
            message: 'please provide email'
        })
    }

    try {

        const findByEmail = await userModel.findOne({
            email: email
        }).lean().exec();

        if (!findByEmail) {
            return res.send({
                Error: true,
                message: 'invalid email or user not found'
            })
        }

        const code = randomString.generate(4);

        const createOpt = await userModel.findOneAndUpdate({ email }, {
            otp: code,
            otpExpiry: new Date(+new Date() + 300000)
        });

        const option =
        {
            from: 'softapps.io3@gmail.com',
            to: email,
            subject: 'Deal Stryker Recover Password Service',
            text: 'Your Code is:',
            html: `<h1>Otp Code</h1>
                <h2>${code}</h2>
                `
        };

        sendMail(option)

        return res.send({
            Error: false,
            message: 'otp has been sent to your email'
        })

    } catch (error) {
        return res.send({
            Error: true,
            message: `internal server error: ${error.message}`
        });
    }
}

exports.verifyOtp = async (req, res) => {
    const { otp, email } = req.body;

    if (!otp || !email) {
        return res.send({
            Error: true,
            message: 'invalid otp or expired otp'
        })
    }

    try {

        const isValid = await userModel.findOne({
            email: email,
            otp: otp,
            otpExpiry: {
                $gte: new Date()
            }
        });

        if (!isValid) {
            return res.send({
                Error: true,
                message: 'invalid otp or expired otp'
            })
        }

        return res.send({
            Error: false,
            message: 'verified'
        })

    } catch (error) {
        return res.send({
            Error: true,
            message: `internal server error: ${error.message}`
        })
    }
}

exports.changePassword = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({
            Error: true,
            message: 'please provide all require fields'
        })
    }

    try {

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const updatePassword = await userModel.findOneAndUpdate({ email: email }, {
            password: hashPassword
        })

        if (!updatePassword) {
            return res.send({
                Error: true,
                message: 'unable to update password'
            })
        }

        return res.send({
            Error: false,
            message: 'password changed'
        });


    } catch (error) {
        return res.send({
            Error: true,
            message: `internal server error: ${error.message}`
        })
    }
}