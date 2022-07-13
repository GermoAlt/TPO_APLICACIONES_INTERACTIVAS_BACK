const express = require('express');
const router = express.Router();
const CalificacionController = require('../../controllers/calificacionController');


router.get('/', CalificacionController.getCalificaciones)
router.get('/:id', CalificacionController.getCalificacionById)
router.get('/:userId',CalificacionController.getCalificacionByUser)
router.post('/', CalificacionController.createCalificacion)
router.put('/:id', CalificacionController.updateCalificacion)

module.exports = router;
