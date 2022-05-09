

const mongoose = require('mongoose');
const router = require('../routes/post');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    //user:
    createdAt: { type: Date, default: Date.now() }
});


module.exports = mongoose.model('Post', PostSchema);