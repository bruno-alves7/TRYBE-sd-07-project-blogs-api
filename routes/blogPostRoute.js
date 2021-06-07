const express = require('express');
const validator = require('../middleware/validator');
const blogPostController = require('../controllers/blogPostController');

const router = express.Router();

router.post('/', validator, blogPostController.blogPostCreate);
router.get('/:id', validator, blogPostController.getByPk);
router.get('/', validator, blogPostController.getAll);
// router.delete('/:id', validator, blogPostController.remove);

module.exports = router;