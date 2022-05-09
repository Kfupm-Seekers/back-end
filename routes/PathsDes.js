
const express = require("express");
const router = express.Router();

// in node we have to write the extension EX: .js , unlike react we can write without extension 
const pathcontroller= require('../controllers/PathsDes.js')
// we use this file to handle Post http request

router.get('/',pathcontroller.getPathsDescription);
router.post('/', pathcontroller.createPathDescription);

module.exports = router;