const { body } = require('express-validator/check');

exports.hasDescription = body("description").isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters long");