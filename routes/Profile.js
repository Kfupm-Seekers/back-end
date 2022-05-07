import express from "express";
const router = express.Router();

// in node we have to write the extension EX: .js , unlike react we can write without extension 
import { AddUserInfo, createUserProfileTest, getProfiles, getProfile } from '../controllers/Profile.js'
// we use this file to handle Post http request

router.get('/userProfile', getProfiles);
router.get('/userProfile/:id', getProfile)
router.post('/uploadImg', createUserProfileTest);
router.post('/profile', AddUserInfo);


export default router;