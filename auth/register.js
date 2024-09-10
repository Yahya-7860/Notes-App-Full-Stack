require("dotenv").config();
const { userModel } = require("../model");
const jwt = require("jsonwebtoken");

const handleUserRegister = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "Username and Password both are required." });
  }

  try {
    const userData = await userModel.create({
      username,
      password,
    });

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    const payload = {
      id: userData.id,
      username: userData.username,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 30000 });

    res
      .status(200)
      .json({ message: "User registered successfully", userData, token });
  } catch (error) {
    if (error.errorResponse.code === 11000) {
      res.status(401).json({ message: "User already exist" });
    } else {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
};

module.exports = handleUserRegister;
