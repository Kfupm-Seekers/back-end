const Course = require('../models/course');

const validationHandler = require('../validations/validationHandler');

exports.index = async(req, res) => {
    try {
        const courses = await Course.find().sort({ createdat: -1 });
        res.send(courses);
    } catch (err) {
        next(err);
    }
};

exports.show = async(req, res, next) => {
    try {
        const course = await Course.findOne({
            _id: req.params.id
        });
        res.send(course);
    } catch (err) {
        next(err);
    }
};
exports.store = async(req, res, next) => {
    try {
        // validationHandler(req);

        let course = new Course();
        course.name = req.body.name;
        course.description = req.body.description;
        course.imageurl = req.body.imageurl;
        course.provider = req.body.provider;
        course.price = req.body.price;
        course = await course.save();

        res.send(course);
        res.send({ message: 'The name is ' + req.body.name });
    } catch (err) {
        next(err)
    }
}

exports.update = async(req, res, next) => {
    try {
        validationHandler(req);

        let course = await Course.findById(req.params.id);
        if (req.body.name != "") {


            course.name = req.body.name;
        }
        if (req.body.description != "") {
            course.description = req.body.description;
        }
        if (req.body.imageurl != "") {
            course.imageurl = req.body.imageurl;
        }
        if (req.body.provider != "") {
            course.provider = req.body.provider;
        }
        if (req.body.price != "") {
            course.price = req.body.price;
        }

        course = await course.save();

        res.send(course);
        res.send({ message: 'The name is ' + req.body.name });
    } catch (err) {
        next(err)
    }
}

exports.delete = async(req, res, next) => {
    try {
        let course = await Course.findById(req.params.id);
        await course.delete();
        res.send({ message: 'The course was deleted' });
    } catch (err) {
        next(err);
    }
}