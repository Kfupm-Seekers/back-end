const PathDescription =  require("../models/pathDescription.js");

exports.getPathsDescription = async (req, res) => {
    // small p in pathDescription for the function
    // capital P in the PathDescription for the file
    try {
        // To retrieve all the paths description in the DB
        // we use async because finding a documnet inside a model
        // taking a time so we use await
        const pathDescription = await PathDescription.find();
        res.status(200).json(pathDescription);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

exports.createPathDescription = async (req, res) => {
    const pathDescriptionDocument = req.body; //req.body is the content of the form
    const newPathDescription = new PathDescription(pathDescriptionDocument);
    try {
        await newPathDescription.save();
        res.status(200).json(newPathDescription)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
