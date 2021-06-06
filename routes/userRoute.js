const express = require('express');
const validator = require('../middleware/validator');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/', userController.userCreate);
router.get('/:id', validator, userController.getByPk);
router.get('/', validator, userController.getAll);
router.delete('/:id', userController.remove);

module.exports = router;
