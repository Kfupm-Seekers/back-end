

const mongoose = require("mongoose");
const BookmarkListSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  list: { type: [String], required: true, default: [] },
});



module.exports = mongoose.model("BookmarkList", BookmarkListSchema);
