const Profile =  require("../models/profile.js");
const multer = require('multer');
const path = require('path');
const { fileURLToPath } = require('url');
const { dirname } = require('path');
const { profile } =  require("console");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

var data3;
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../public_images/', 'uploads'),
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})



exports.getProfiles = async (req, res) => {
    // small p in pathDescription for the function
    // capital P in the PathDescription for the file
    try {
        // To retrieve all the paths description in the DB
        // we use async because finding a documnet inside a model
        // taking a time so we use await
        const userProfile = await Profile.find();
        res.status(200).json(userProfile);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

exports.createUserProfile = async (req, res) => {
    const userProfileDocument = req.body; //req.body is the content of the form
    const newUserProfile = new PathDescription(userProfileDocument);
    try {
        await newUserProfile.save();
        req.status(200).json(newUserProfile)
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

exports.AddUserInfo = (req, res) => {
    data3 = req.body;
}

exports.createUserProfileTest = async (req, res) => {
    let upload = multer({ storage: storage }).single('avatar');
    try {
        upload(req, res, function (err) {

            if (!req.file) {
                return res.send('Please select an image to upload')
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }
            // DB to store profile img
            data3.image = req.file.filename;
            console.log("Image is uploaded")
            console.log(data3)
            const newProfile = new Profile(data3);
            newProfile.save();
        });

    } catch (err) {
        console.log(err);
    }
}

exports.getProfile = (req, res) => {
    console.log(req.params.id)
    Profile.findById(req.params.id)
    .then(result => {
        res.status(200).json({profile : result})
    }).catch(err => {
        console.log(err)
    })
}