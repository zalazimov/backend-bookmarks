// Importing dependencies
const express = require("express");
const router = express.Router();
const {
  getAllBookmarks,
  getBookmarkById,
  createBookmark,
  deleteBookmarkById,
  updateBookmarkById,
} = require("../queries/bookmarks.js");

const {
  checkName,
  checkBoolean,
  validateURL,
} = require("../validations/checkBookmarks.js");

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

// Create a bookmark entry
router.post("/", checkBoolean, checkName, async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body);
    res.json(bookmark);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// Delete a bookmark by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedBookmark = await deleteBookmarkById(req.params.id);

    if (deletedBookmark.length === 0) {
      res.status(404).json("Bookmark not found");
    } else {
      res.json(deletedBookmark[0]);
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// Update bookmark by id
router.put("/:id", checkName, checkBoolean, validateURL, async (req, res) => {
  try {
    const updatdBookmark = await updateBookmarkById(req.params.id, req.body);

    if (updatdBookmark.length === 0) {
      res.status(404).json("The bookmark you're searching for is not found");
    } else {
      res.json(updatdBookmark[0]);
    }
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// Exporting
module.exports = router;
