const db = require("../db/dbConfig.js");

const getAllBookmarks = async () => {
  try {
    const allBookmarks = await db.any("SELECT * FROM bookmarks");
    return allBookmarks;
  } catch (error) {
    return error;
  }
};

const getBookmarkById = async (id) => {
  try {
    const oneBookmark = await db.any("SELECT * FROM bookmarks WHERE id = $1", [
      id,
    ]);

    return oneBookmark;
  } catch (error) {
    return error;
  }
};

const createBookmark = async (bookmark) => {
  try {
    const newBookmark = await db.any(
      "INSERT INTO bookmarks (name, url, category, is_favorite) VALUES ($1, $2, $3, $4) RETURNING *",
      [bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite]
    );

    return newBookmark;
  } catch (error) {
    return error;
  }
};

module.exports = { getBookmarkById, getAllBookmarks, createBookmark };
