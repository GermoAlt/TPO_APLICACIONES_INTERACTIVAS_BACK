const express = require('express');
const router = express.Router();
const RecipeController = require('../../controllers/recipeController');


router.get('/test',function(req, res) {
    res.send('Test recipes ok');
})

// This routes will be appended to "http://localhost:3600/recipes"

router.get('/recipes', RecipeController.getRecipes)
router.get('/recipe/:id', RecipeController.getRecipeById)
router.get('/recipes/:userId',RecipeController.getRecipesByUser)
router.post('/recipe', RecipeController.createRecipe)
router.put('/recipe/:id', RecipeController.updateRecipe)
router.delete('/recipe/:id', RecipeController.deleteRecipe)

router.post('/recipeImage',RecipeController.uploadImage)

module.exports = router;
