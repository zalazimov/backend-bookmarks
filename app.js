//Dependencies
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

//Dependency of bookmarkController.js file
const bookmarksController = require("./controllers/bookmarkController.js");

//Configuration
const app = express();

//Creating our middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Creating middleware to designate a path via my controller
//and showing its route
app.use("/bookmarks", bookmarksController);

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});

// 404 page route
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

//Exporting
module.exports = app;
