const { userModel } = require("../model");
const bcrypt = require("bcrypt");

const handleUserRegister = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "Username and Password both are required." });
  }

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  // bcrypt.genSalt(saltRounds, (err, salt) => {
  //   if (err) {
  //     throw err;
  //   }
  //   bcrypt.hash(password, salt, (err, hash) => {
  //     if (err) {
  //       throw err;
  //     }
  //     hashPassword = hash;
  //   });
  // });

  try {
    const userData = await userModel.create({
      username,
      password: hashPassword,
    });
    res.status(200).json({ message: "User registered successfully", userData });
  } catch (error) {
    // if (error.errorResponse.code === 11000) {
    //   res.status(401).json({ message: "User already exist" });
    // } else {
    // }
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { handleUserRegister };
