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

const deleteBookmarkById = async (id) => {
  try {
    const deletedBookmark = await db.any(
      "DELETE FROM bookmarks WHERE id = $1 RETURNING *",
      id
    );
    return deletedBookmark;
  } catch (e) {
    return e;
  }
};

const updateBookmarkById = async (id, bookmark) => {
  try {
    let dynamicValues = Object.values(bookmark);

    function makeQueryString(data) {
      let count = 2;
      let result = "";

      for (let key in data) {
        result += `${key} = $${count},`;
        count++;
      }
      result = result.substring(0, result.length - 1);
      return result;
    }

    let queryString = makeQueryString(bookmark);

    const updatedBookmark = await db.any(
      `UPDATE bookmarks SET ${queryString} WHERE id = $1 RETURNING *`,
      [id, ...dynamicValues]
    );
    return updatedBookmark;
  } catch (error) {
    return error;
  }
};

// THIS IS THE ORIGINAL UPDATE FUNCTION but it does not account for dynamic values when user wants to update just one or two keys. Dynamic values allow only the entered values to be updated.
// const updateBookmarkById = async (id, bookmark) => {
//   try {
//     const updatedBookmark = await db.any(
//       "UPDATE bookmarks SET name=$1, url=$2, category=$3, is_favorite=$4 WHERE id=$5 RETURNING *",
//       [bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite, id]
//     );
//     return updatedBookmark;
//   } catch (error) {
//     return error;
//   }
// };

module.exports = {
  getBookmarkById,
  getAllBookmarks,
  createBookmark,
  deleteBookmarkById,
  updateBookmarkById,
};
