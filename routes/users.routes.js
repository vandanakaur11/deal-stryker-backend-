const express = require("express");
const { signUpUser, login, requestOtp, verifyOtp, changePassword } = require("../controllers/user.controller");
const app = express();

const router = express.Router();

router.get("/", (req, res) => {
    return res.send({
        Error: false,
        message: "user route works!",
    });
});

router.post("/signup", signUpUser);

router.post('/login', login);

router.post('/verify-email', requestOtp);

router.post('/verify-otp', verifyOtp);

router.post('/change-pass', changePassword);

exports.userRoutes = app.use("/users", router);
