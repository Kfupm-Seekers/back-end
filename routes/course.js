const express = require('express');
const courseController = require('../controllers/courseController');
const uploadImage = require('../middlewares/multer');
// const { hasDescription } = require('../validations/validators');
const router = express.Router();

router.get('/', courseController.index);
router.get('/:id', courseController.show);
router.post('/',
    courseController.store);
router.patch("/:id", courseController.update)
router.delete("/:id", courseController.delete);
module.exports = router;