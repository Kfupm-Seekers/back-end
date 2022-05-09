

const express = require('express');
const treeController = require('../controllers/treeController');
// const { hasDescription } = require('../validations/validators');
const router = express.Router();

router.get('/', treeController.index);
router.get('/:id', treeController.show);
router.post('/',
    treeController.post);
router.patch("/:id", treeController.update)
router.delete("/:id", treeController.delete);
module.exports = router;