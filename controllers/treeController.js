
const Tree = require('../models/tree');
const Course = require('../models/course');
const validationHandler = require('../validations/validationHandler');

exports.index = async(req, res) => {
    try {
        const trees = await Tree.find().sort({ createdat: -1 });
        res.send(trees);
    } catch (err) {
        res.status(404).json({ "message": "Error not found" });
    }
};

exports.show = async(req, res, next) => {
    try {
        let tree = await Tree.findById(req.params.id)
            .populate('courses')

        tree = await tree.save();
        res.send(tree);


    } catch (err) {
        res.status(404).json({ "message": "Error not found" });
    }
};

exports.post = async(req, res, next) => {
    try {
        // validationHandler(req);

        let tree = new Tree();
        tree.name = req.body.name;
        tree.description = req.body.description;
        tree.imageurl = req.body.imageurl;
        tree.courses = req.body.courses;
        tree = await tree.save();

        res.send(tree);
        res.send({ message: 'The name is ' + req.body.name });
    } catch (err) {
        res.status(404).json({ "message": "Error not found" });
    }
}
exports.update = async(req, res, next) => {
    try {
        validationHandler(req);

        let tree = await Tree.findById(req.params.id)
            .populate('courses');

        tree.courses.push("'" + req.body.courseId + "'");

        tree = await tree.save();

        res.send(tree);
        res.send({ message: 'The name is ' + req.body.name });
    } catch (err) {
        res.status(404).json({ "message": "Error not found" });
    }
}

exports.delete = async(req, res, next) => {
    try {
        const tree = await Tree.findById(req.params.id);
        await tree.remove();
        res.send({ message: 'Tree deleted' });
    } catch (err) {
        res.status(404).json({ "message": "Error not found" });
    }
}