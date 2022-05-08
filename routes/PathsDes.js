import express from "express";
const router = express.Router();

// in node we have to write the extension EX: .js , unlike react we can write without extension 
import {getPathsDescription, createPathDescription} from '../controllers/PathsDes.js'
// we use this file to handle Post http request

router.get('/', getPathsDescription);
router.post('/', createPathDescription);

export default router;