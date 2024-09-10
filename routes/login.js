const loginRouter = require("express").Router();
const { login } = require("../auth");

loginRouter.post("/login", login);

module.exports = { loginRouter };
