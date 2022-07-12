const RecipeService = require("../services/recipeService");

exports.getRecipes = async (req,res) => {
    try {
        const recipes = await RecipeService.listRecipes();
        return res.status(200).json({recipes, message: "Recetas obtenidas con éxito"});
    } catch (err) {
        console.log("Error: " + err);
        return res.status(400).json({status: 400, message: "Error al obtener recetas"});
    }
}

exports.getRecipeById = async (req,res) => {
    try {
        const recipe = await RecipeService.findRecipeById(req.params.id);
        return res.status(200).json({recipe, message: "Receta obtenida con éxito"});
    } catch (err) {
        console.log("Error: " + err);
        return res.status(400).json({status: 400, message: "Error al obtener receta"});
    }
}

exports.getRecipesByUser = async (req,res) => {

}

exports.createRecipe = async (req,res) => {
    try {
        const Recipe = {
            autor: req.body.autor, // full user object
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            imagenes: req.body.imagenes,
            dificultad: req.body.dificultad,
            categorias: req.body.categorias, // array
            tiempoPreparacion: req.body.tiempoPreparacion,
            tiempoElaboracion: req.body.tiempoElaboracion,
            porciones: req.body.porciones,
            ingredientes: req.body.ingredientes, // array
            pasos: req.body.pasos, // array
            estado: req.body.estado
        };
        const createdRecipe = await RecipeService.newRecipe(Recipe);
        return res.status(201).json({createdRecipe, message: "Se creó la receta: " + Recipe.titulo});
    } catch (e) {
        console.log("Error: " + e);
        return res.status(400).json({status: 400, message: "Falló la creación de la receta"});
    }
}

exports.updateRecipe = (req,res) => {

}

exports.deleteRecipe = async (req,res) => {

}

exports.uploadImage = async (req,res) => {
    try {
        var dataURI = req.body.dataURI;
        var uploadStr = 'data:image/jpeg;base64,' + dataURI;

        let result = await RecipeService.newImage(uploadStr)
        res.status(200).json({
            urlFoto: result.url,
            extension: result.format,
            message: "Imagen subida a cloudinary con éxito"
        })
    }
    catch(err) {
        console.log("Error: ", err)
        res.status(400).json({
            status: 400,
            message: 'Error al subir imagen a cloudinary',
        })
    }
}