//* dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Foodlogs = require("./controller/Foodlogs");

//* config
const app = express();
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);
mongoose.set("debug", true);
const PORT = process.env.PORT ?? 3000;

//* middleware
app.use(morgan("dev"));
app.use(express.json());
app.use("/foods", Foodlogs);

//* routes
app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

//* listener
mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb");
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
