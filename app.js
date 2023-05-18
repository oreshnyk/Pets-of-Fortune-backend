const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const app = express();

async function main() {
  try {
    mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connection successful");

    const formatsLogger =
      app.get(process.env.NODE_ENV) === "development" ? "short" : "dev";

    app.use(logger(formatsLogger));
    app.use(cors());
    app.use(express.json());


    app.use((req, res) => {
      res.status(404).json({ message: "Not found" });
    });

    app.use((err, req, res, next) => {
      res.status(500).json({ message: err.message });
    });
  } catch (error) {
    console.log(error.message);
  }
}
main();

module.exports = app;