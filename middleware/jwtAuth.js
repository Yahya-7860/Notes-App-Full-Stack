require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtAuthentication = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ Message: "Access Denied" });
  }
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  try {
    const decoded_user_data = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded_user_data;
    next();
  } catch (error) {
    res.status(401).json({ Error: "Invalid token" });
  }
};

module.exports = jwtAuthentication;
