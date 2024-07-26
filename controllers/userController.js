const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const otpStore = {};

const generateOTP = () => {
  return crypto.randomBytes(3).toString("hex"); // 6 digit OTP
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.registerUser = async (req, res) => {
  try {
    const userExists = await Users.findOne({ email: req.body.email });
    if (userExists) {
      res.send({
        success: false,
        message: "user already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedpass;

    const newUser = new Users(req.body);
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: `error while signup -> ${error}` });
  }
};

exports.send_otp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Code for House arena registration",
      text: `Your OTP code is ${otp}`,
    };

    // Save OTP in database or in-memory store (e.g., Redis)
    // For simplicity, let's save it in a temporary in-memory object
    otpStore[email] = otp; // Note: This is not a secure method for production

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error); // Log the error
      res.status(500).send({ success: false, message: `Failed to send OTP: ${error.message}` });
    }
  } catch (error) {
    console.error("Error in send_otp function:", error); // Log the error
    res.status(500).send({ success: false, message: `Failed to send OTP for verification: ${error.message}` });
  }
};

exports.verify_otp = (req, res) => {
  try {
    const { email, otp } = req.body;
    if (otpStore[email] && otpStore[email] === otp) {
      // OTP matches
      delete otpStore[email]; // Clear OTP after verification
      res
        .status(200)
        .send({ success: true, message: "OTP verified successfully" });
    } else {
      // OTP does not match
      res.status(400).send({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to verify OTP" });
  }
};

exports.loginUser = async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });

  if (!user) {
    res.send({
      success: false,
      message: "user not found",
    });
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) {
    res.send({
      success: false,
      message: "invalid password",
    });
  }
  res.send({
    success: true,
    message: "login successfull",
  });
};