// Importing dependencies
const express = require("express");
const router = express.Router();
const {
  getAllBookmarks,
  getBookmarkById,
  createBookmark,
} = require("../queries/bookmarks.js");

const { checkName, checkBoolean } = require("../validations/checkBookmarks.js");

// Index
// Get all bookmarks list
router.get("/", async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if (!allBookmarks) {
    res.status(500).json({ error: "server error" });
  } else {
    res.status(200).json(allBookmarks);
  }
});

// Get bookmark by id
router.get("/:id", async (req, res) => {
  try {
    const bookmark = await getBookmarkById(req.params.id);

    // if (bookmark.message === "No data returned from the query.") {
    //   return res.status(404).json({ error: "not found" });
    // }

    if (!bookmark || bookmark.length === 0) {
      return res.status(404).json({ error: "not found" });
    } else {
      return res.status(200).json(bookmark[0]);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", checkBoolean, checkName, async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body);
    res.json(bookmark);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// Exporting
module.exports = router;
