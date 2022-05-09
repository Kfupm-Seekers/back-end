

const express = require("express");
const router = express.Router();

// in node we have to write the extension EX: .js , unlike react we can write without extension 
const profileController = require('../controllers/Profile.js')
// we use this file to handle Post http request

router.get('/userProfile', profileController.getProfiles);
router.get('/userProfile/:id', profileController.getProfile)
router.post('/uploadImg', profileController.createUserProfileTest);
router.post('/profile',profileController.AddUserInfo);


module.exports = router;