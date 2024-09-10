const registerRouter = require("express").Router();
const { handleUserRegister } = require("../auth");

registerRouter.post("/register", handleUserRegister);

module.exports = { registerRouter };
