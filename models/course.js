const mongoose = require('mongoose');
const router = require('../routes/course');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    provider: { type: String, required: true },
    price: { type: Number, required: true },
    imageurl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Course', CourseSchema);