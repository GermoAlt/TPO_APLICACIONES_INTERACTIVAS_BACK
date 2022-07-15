const express = require('express');
const router = express.Router();
const CalificacionController = require('../../controllers/calificacionController');
const jwtValidation = require('../../auth/jwtValidation')


router.get('/', CalificacionController.getCalificaciones)
router.get('/:id', CalificacionController.getCalificacionById)
router.get('/:userId',CalificacionController.getCalificacionByUser)
router.get('/recipe/:id',CalificacionController.getCalificacionesByReceta)
router.post('/', jwtValidation.checkToken, CalificacionController.createCalificacion)
router.put('/:id', CalificacionController.updateCalificacion)

module.exports = router;
