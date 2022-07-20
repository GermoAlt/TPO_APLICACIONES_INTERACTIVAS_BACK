const Recipe = require('../models/recetaModel');


exports.listRecipes = async () => {
    try{
        return await Recipe.find({"estado": "Publicada"});
    }catch(err){
        console.log("Error: " + err);
        throw Error("Error al obtener recetas")
    }
}

exports.findRecipeById = async (id) => {
    try{
        return await Recipe.findOne({"_id": id});
    }catch(err){
        console.log("Error: " + err);
        throw Error("Error al obtener receta por id")
    }
}

exports.findRecipeByUserId = async (userId) => {
    try{
        return await Recipe.find({"autor._id": userId});
    }catch(err){
        console.log("Error: " + err);
        throw Error("Error al obtener recetas por usuario")
    }
}

exports.newRecipe = async (recipe) => {
    try{
        const newRecipe = new Recipe({
            ...recipe,
            date: new Date(),
        });
        console.log("newRecipe: ", newRecipe);
        return await newRecipe.save();
    }
    catch(err){
        console.log("Error: " + err);
        throw Error("Error al crear receta")
    }
}

exports.updateRecipe = async (id,newRecipe) => {
    try{
        return await Recipe.updateOne({"_id": id}, newRecipe);
    }catch(err){
        console.log("Error: " + err);
        throw Error("Error al actualizar recetas")
    }
}

exports.deleteRecipe = async (id) => {
    try{
        return await Recipe.remove({"_id": id});
    }catch(err){
        console.log("Error: " + err);
        throw Error("Error al actualizar recetas")
    }
}