// Importing dependencies
const express = require("express");
const router = express.Router();
const { getAllBookmarks } = require("../queries/bookmarks.js");

// Index
router.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if (!allBookmarks) {
    res.status(500).json({ error: "server error" });
  } else {
    res.status(200).json(allBookmarks);
  }
});

// Exporting
module.exports = router;
