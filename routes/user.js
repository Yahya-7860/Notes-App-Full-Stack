const userRouter = require("express").Router();
const { handleUserRegister } = require("../controller");

userRouter.post("/register", handleUserRegister);

module.exports = { userRouter };
