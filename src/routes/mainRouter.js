const router = require('express').Router();

const userRouter = require('./modelRoutes/userRoute');
const recipeRouter = require('./modelRoutes/recipeRoute');
const calificacionRouter = require('./modelRoutes/calificacionRouter');
const categoryRouter = require('./modelRoutes/categoryRoutes');
const newsletterRouter = require('./modelRoutes/newsletterRoutes');

router.use('/users', userRouter);
router.use('/recipes', recipeRouter);
router.use('/calificaciones', calificacionRouter);
router.use("/categories", categoryRouter)
router.use("/newsletter",newsletterRouter);

module.exports = router;