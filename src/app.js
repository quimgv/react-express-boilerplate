const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const path = require("path");
const userRouter = require("./routers/user");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/users", userRouter);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
