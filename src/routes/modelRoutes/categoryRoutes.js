const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');

// This routes will be appended to "http://localhost:3600/categories"

router.get('/',categoryController.obtenerCategorias);

module.exports = router;