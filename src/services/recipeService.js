const Recipe = require('../models/recetaModel');
const cloudinary = require('cloudinary')
const config = require('../config/env.config');

cloudinary.config({ // Add cloudinary keys locally to config file
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET
})

exports.listRecipes = async () => {
    try{
        const recipes = await Recipe.find({"estado":"Publicada"});
        return recipes;
    }catch(err){
        console.log("Error: " + err);
        throw Error("Error al obtener recetas")
    }
}

exports.findRecipeById = async (id) => {
    try{
        const recipes = await Recipe.findOne({"_id":id});
        return recipes;
    }catch(err){
        console.log("Error: " + err);
        throw Error("Error al obtener receta por id")
    }
}

exports.findRecipeByUserId = async (userId) => {
    try{
        const recipes = await Recipe.find({"autor.id":userId});
        return recipes;
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
        let savedRecipe = await newRecipe.save()
        return savedRecipe;
    }
    catch(err){
        console.log("Error: " + err);
        throw Error("Error al crear receta")
    }
}

exports.updateRecipe = async (id,newRecipe) => {
    try{
        const recipe = await Recipe.updateOne({"_id":id},newRecipe);
        return recipe;
    }catch(err){
        console.log("Error: " + err);
        throw Error("Error al actualizar recetas")
    }
}

exports.deleteRecipe = async (id) => {
    try{
        const recipe = await Recipe.remove({"_id":id});
        return recipe;
    }catch(err){
        console.log("Error: " + err);
        throw Error("Error al actualizar recetas")
    }
}

exports.newImage = async (uploadStr) => {
    try{
        let uploadResult = await cloudinary.v2.uploader.upload(uploadStr, {
            folder: 'recetas/receta',
            overwrite: true,
            invalidate: true,
            width: 965, height: 643, crop: "fill"
        })
        return uploadResult;
    }
    catch(err){
        console.log("Error: " + err);
        throw Error("Error al subir imagen a cloudinary")
    }
}