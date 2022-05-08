
//for path bookmark
const mongoose = require("mongoose");
const BookmarkListPathSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    list: { type: [String], required: true, default: [] },
});



module.exports = mongoose.model("BookmarkListPath", BookmarkListPathSchema);
