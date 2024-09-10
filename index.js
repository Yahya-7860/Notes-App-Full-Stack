require("dotenv").config();
const { notesRouter, registerRouter, loginRouter } = require("./routes");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { PswHashing } = require("./middleware");

const port = process.env.PORT;
const dbUrl = process.env.DATABASE_URL;

const dbConnection = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error " + error);
  }
};
dbConnection();
app.listen(port, () => {
  console.log(`Server started listening at ${port}`);
});

app.use(express.json());

app.use("/user", loginRouter);
app.use("/user", PswHashing, registerRouter);
app.use("/", notesRouter);
