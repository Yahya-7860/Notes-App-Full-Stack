require("dotenv").config();
const { userModel } = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const dbUser = await userModel.findOne({ username });
    if (!dbUser) {
      return res.status(404).json({ Message: "User not found" });
    }

    const dbPasswordMatch = await bcrypt.compare(password, dbUser.password);
    if (!dbPasswordMatch) {
      return res.status(401).json({ Message: "Incorrect Password" });
    }
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const payload = {
      id: dbUser.id,
      username: dbUser.username,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "10m" });
    res
      .status(200)
      .json({ Message: "User Found, Successfully Logged in", token });
  } catch (error) {
    res.status(401).json({ Message: "Authentication failed" });
  }
};

module.exports = login;
