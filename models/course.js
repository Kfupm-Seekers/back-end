
const mongoose = require('mongoose');
const router = require('../routes/course');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    courseSite: { type: String, required: true },
    image_url: { type: String, required: true },
    url: { type: String, required: false },
    path: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now() },
   
});

module.exports = mongoose.model('Course', CourseSchema);