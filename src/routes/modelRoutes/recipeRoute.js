const express = require('express');
const router = express.Router();
const RecipeController = require('../../controllers/recipeController');
const jwtValidation = require('../../auth/jwtValidation')

// This routes will be appended to "http://localhost:3600/recipes"

router.get('/recipes', RecipeController.getRecipes)
router.get('/recipe/:id', RecipeController.getRecipeById)
router.get('/recipes/:userId',RecipeController.getRecipesByUser)
router.post('/recipe', jwtValidation.checkToken, RecipeController.createRecipe)
router.put('/recipe/:id', jwtValidation.checkToken, RecipeController.updateRecipe)
router.delete('/recipe/:id', jwtValidation.checkToken, RecipeController.deleteRecipe)

//router.post('/recipeImage', jwtValidation.checkToken, RecipeController.uploadImage)

module.exports = router;
