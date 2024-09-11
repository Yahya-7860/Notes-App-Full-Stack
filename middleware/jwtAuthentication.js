require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtAuthentication = async (req, res, next) => {
  const bearerToken = req.headers?.authorization;
  const token = bearerToken?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ Message: "Access Denied" });
  }
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  try {
    const decoded_user_data = jwt.verify(token, JWT_SECRET_KEY);
    const { id } = decoded_user_data;
    req.userid = id;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ Error: "Invalid token or session Expired, Login Again" });
  }
};

module.exports = jwtAuthentication;
