const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

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

exports.loginUser = async (req, res) => {
    const user = await Users.findOne({ email:req.body.email });

    if (!user) {
        res.send({
            success: false,
            message: "user not found"
        });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
        res.send({
            success: false,
            message: "invalid password"
        });
    }
    res.send({
        success: true,
        message: "login successfull"
    });
};