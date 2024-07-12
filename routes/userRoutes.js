const express = require("express");
const router = express.Router();
const { registerUser, loginUser, send_otp, verify_otp } = require("../controllers/userController");

router.post('/register', registerUser);
router.post('/register/otp/send_otp', send_otp);
router.post('/register/otp/verify_otp', verify_otp);
router.get('/login', loginUser);

module.exports = router;
