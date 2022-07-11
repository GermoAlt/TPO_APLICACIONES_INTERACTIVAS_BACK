const Recipe = require('../models/recetaModel');
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: '', // Complete
    api_key: '', // Complete
    api_secret: '' // Complete
})

exports.listRecipes = async () => {
    try{
        const recipes = await Recipe.find({});
        return recipes;
    }catch(err){
        console.log("Error: " + err);
        throw Error("Error al obtener recetas")
    }
}

exports.findRecipeById = async () => {

}

exports.newRecipe = async (recipe) => {
    try{
        const newRecipe = new Recipe({
            ...recipe,
            date: new Date()
        });
        let savedRecipe = await newRecipe.save()
        return savedRecipe;
    }
    catch(err){
        console.log("Error: " + err);
        throw Error("Error al crear receta")
    }

}

exports.updateRecipe = async () => {

}

exports.deleteRecipe = async () => {

}

exports.newImage = async (uploadStr) => {
    try{
        let uploadResult = await cloudinary.v2.uploader.upload(uploadStr, {
            overwrite: true,
            invalidate: true,
            width: 810, height: 456, crop: "fill"
        })
        return uploadResult;
    }
    catch(err){
        console.log("Error: " + err);
        throw Error("Error al subir imagen a cloudinary")
    }
}