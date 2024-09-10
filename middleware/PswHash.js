const bcrypt = require("bcrypt");

const PswHashing = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(401).json({ Message: "Password is required" });
  }
  try {
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);
    next();
  } catch (error) {
    return res.status(400).json({ Message: "Unable to hash password" });
  }
};

module.exports = PswHashing;
