import Users from "../models/userModel.js";
import OTP from "../models/otpmodel.js";
import { genSalt, hash, compare } from "bcrypt";
import { randomBytes } from "crypto";
import { transporter } from "../config/email.js";
import jwt from "jsonwebtoken";
import AdminEmail from "../models/adminEmailsModel.js";


export async function send_otp(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    const isUserEmail = await Users.findOne({ email: req.body.email });
    if (!isUserEmail) {
      return res.send({
        success: false,
        message: "User does not exist, please register first",
      });
    }
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
    if (!email || !otp) {
      return res.status(400).send({
        success: false,
        message: "Email and OTP are required",
      });
    }
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

export async function reset_password(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }
    const salt = await genSalt(10);
    console.log("Generated salt:", salt);
    console.log("Request body:", req.body.password);
    if (!req.body.password) {
      throw new Error("Password is missing in the request body");
    }
    const newHashedPassword = await hash(req.body.password, salt);
    req.body.password = newHashedPassword;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.password = newHashedPassword;
    await user.save();

    res.send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error in reset_password function:", error);
    res
      .status(500)
      .send({ success: false, message: "Failed to reset password" });
  }
}
export async function registerUser(req, res) {
  try {
    // console.log("Request body:", req.body); // Log the request body

    const isAdminEmail = await AdminEmail.findOne({ email: req.body.email });
    if (!isAdminEmail) {
      return res.send({
        success: false,
        message:
          "tum to admin nahi ho! Lagta hai coding assignments zyada ho gaye.",
      });
    }

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
    res.status(500).json({
      error: `error while signup -> ${error}`,
      message: "User registration failed",
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const validPass = await compare(password, user.password);

    if (!validPass) {
      return res.status(401).send({
        success: false,
        message: "invalid password",
      });
    }

    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not set in environment variables");
    }

    const token = jwt.sign(
      {
        user: user,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1 days",
      }
    );

    // res.cookie("jwtLoginToken", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    // });

    res.send({
      success: true,
      message: "login successfull",
      token
    });
  } catch (error) {
    console.error("Error in loginUser function:", error); // Log the error
    res
      .status(500)
      .json({ success: false, error: `error while login -> ${error}` });
  }
}
