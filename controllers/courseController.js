

const Course = require('../models/course');

const validationHandler = require('../validations/validationHandler');

exports.index = async(req, res) => {
    try {
        const courses = await Course.find().sort({ createdat: -1 });
        res.send(courses);
    } catch (err) {
        res.status(404).json({ "message": "Error not found" });
    }
};

exports.show = async(req, res, next) => {
    try {
        const course = await Course.findOne({
            _id: req.params.id
        });
        if (course == null) {
            res.status(404).json({ "message": "Error not found" });

        }
        res.send(course);
    } catch (err) {
        res.status(404).json({ "message": "Error not found" });

    }
};
exports.post = async(req, res, next) => {
    try {
        // validationHandler(req);

        let course = new Course();
       course.title = req.body.title;
        course.subtitle = req.body.subtitle;
        course.image_url = req.body.image_url;
        course.courseSite = req.body.courseSite;
        course = await course.save();

        res.send(course);
        res.send({ message: 'The name is ' + req.body.name });
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.update = async(req, res, next) => {
    try {
        validationHandler(req);

        let course = await Course.findById(req.params.id);
        if (req.body.title != "") {


           course.title = req.body.title;
        }
        if (req.body.subtitle != "") {
            course.description = req.body.subtitle;
        }
        if (req.body.image_url != "") {
            course.image_url = req.body.image_url;
        }
        if (req.body.courseSite != "") {
            course.courseSite = req.body.courseSite;
        }

        course = await course.save();

        res.send(course);
        res.send({ message: 'The name is ' + req.body.title });
    } catch (err) {
        res.status(404).json({ "message": "Error not found" });
    }
}

exports.delete = async(req, res, next) => {
    try {
        let course = await Course.findById(req.params.id);
        await course.delete();
        res.send({ message: 'The course was deleted' });
    } catch (err) {
        res.status(404).json({ "message": "Error not found" });
    }
}