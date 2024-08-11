import Users from "../models/userModel.js";
import OTP from "../models/otpmodel.js";
import { genSalt, hash, compare } from "bcrypt";
import { randomBytes } from "crypto";
import { transporter } from "../config/email.js";
import jwt from "jsonwebtoken";

export async function send_otp(req, res) {
  try {
    const { email } = req.body;
    const otp = randomBytes(3).toString("hex");
    const mailOptions = {
      from: "housearena.sam@gmail.com",
      to: email,
      subject: "OTP Code for House arena registration",
      html: `<p>Your OTP code is <strong>${otp}</strong>, will expire in 5 mins</p> <br> <p>Use this code to verify your email address</p><br><p>Having trouble? Contact us by replying to <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a></p>`,
    };

    await OTP.create({ email, otp });

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send({ success: true, message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error); // Log the error
      res.status(500).send({
        success: false,
        message: `Failed to send OTP: ${error.message}`,
      });
    }
  } catch (error) {
    console.error("Error in send_otp function:", error); // Log the error
    res.status(500).send({
      success: false,
      message: `Failed to send OTP for verification: ${error.message}`,
    });
  }
}

export async function verify_otp(req, res) {
  try {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ email, otp });

    if (otpRecord) {
      // OTP matches
      await OTP.deleteOne({ email, otp });
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
}

export async function registerUser(req, res) {
  try {
    console.log("Request body:", req.body); // Log the request body

    const userExists = await Users.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "user already exists",
      });
    }

    const salt = await genSalt(10);
    console.log("Generated salt:", salt); // Log the generated salt
    console.log("Request body:", req.body.password); // Log the request body
    if (!req.body.password) {
      throw new Error("Password is missing in the request body");
    }

    const hashedpass = await hash(req.body.password, salt);
    console.log("Hashed password:", hashedpass); // Log the hashed password

    req.body.password = hashedpass;

    const newUser = new Users(req.body);
    await newUser.save();
    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerUser function:", error); // Log the error
    res.status(500).json({ error: `error while signup -> ${error}` });
  }
}

export async function loginUser(req, res) {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const validPass = await compare(req.body.password, user.password);

    if (!validPass) {
      return res.status(401).send({
        success: false,
        message: "invalid password",
      });
    }

    const token = jwt.sign({
      user: user,
    }, process.env.TOKEN_SECRET,{
      expiresIn: "1 days",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    });

    res.send({
      success: true,
      message: "login successfull",
    });
  } catch (error) {
    console.error("Error in loginUser function:", error); // Log the error
    res
      .status(500)
      .json({ success: false, error: `error while login -> ${error}` });
  }
}
