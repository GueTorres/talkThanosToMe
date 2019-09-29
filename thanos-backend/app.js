const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Line = require("./models/Lines");
require("dotenv/config");

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("Hello world, this is my thanos app");
});

app.get("/api/getData", async (req, res) => {
  try {
    const lines = await Line.find();
    res.json(lines);
  } catch (err) {
    res.json(err);
  }
});

app.post("/api/insertData", async (req, res) => {
  const line = new Line({
    sentiment: req.body.sentiment,
    line: req.body.line
  });
  try {
    const saveLine = await line.save();
    res.json(saveLine);
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/api/message", async (req, res) => {
  // const message = req.body.message;
  // console.log(message);
  const line = await Line.find();
  const x = Math.floor(Math.random() * 20 + 1);
  thanosLine = line[x];
  res.json(thanosLine);
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
