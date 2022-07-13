const router = require('express').Router();

const userRouter = require('./modelRoutes/userRoute');
const recipeRouter = require('./modelRoutes/recipeRoute');
const calificacionRouter = require('./modelRoutes/calificacionRouter');

router.use('/users', userRouter);
router.use('/recipes', recipeRouter);
router.use('/calificaciones', calificacionRouter);

module.exports = router;