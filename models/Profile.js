

const mongoose = require('mongoose')
// for each clooection we make a CRUD
const profileSchema = mongoose.Schema({
    userId: Number,
    firstName: String,
    lastName: String,
    linkedin: String,
    image: String,
})

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;