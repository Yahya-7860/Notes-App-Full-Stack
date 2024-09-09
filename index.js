require("dotenv").config();
const { notesRouter, userRouter } = require("./routes");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

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

app.use("/", userRouter);
app.use("/", notesRouter);
