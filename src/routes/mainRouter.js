const router = require('express').Router();

const userRouter = require('./modelRoutes/userRoute');
const recipeRouter = require('./modelRoutes/recipeRoute');

router.use('/users', userRouter);
router.use('/recipes', recipeRouter);

module.exports = router;