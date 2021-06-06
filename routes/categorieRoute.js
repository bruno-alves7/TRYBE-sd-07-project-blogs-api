const express = require('express');
const validator = require('../middleware/validator');
const categorieController = require('../controllers/categorieController');

const router = express.Router();

router.post('/', validator, categorieController.categorieCreate);
router.get('/', validator, categorieController.getAll);

module.exports = router;
