const mongoose = require('mongoose');
// const router = require('../routes/course');
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    level: { type: String, required: true },
    path: { type: Number, required: true },
    description: { type: String, required: true },
    answer : { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, required: true }

});

module.exports = mongoose.model('Question', QuestionSchema);