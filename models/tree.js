const mongoose = require('mongoose');
const router = require('../routes/tree');
const Schema = mongoose.Schema;
const TreeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    imageurl: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Tree', TreeSchema);