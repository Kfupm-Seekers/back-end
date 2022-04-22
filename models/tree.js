const mongoose = require('mongoose');
const router = require('../routes/tree');
const Schema = mongoose.Schema;
const TreeSchema = new Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    createdAt: { type: Date, default: Date.now() },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Tree', TreeSchema);