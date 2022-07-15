//se tiene que poder crear una calificacion con un id de receta que puedo existir en db o no
/*
* Los usuarios registrados podrán calificar las recetas publicadas. Esta calificación debe poder visualizarse en el sitio principal para que los usuarios puedan filtrar recetas.
* */


const CalificacionService = require("../services/calificacionService");

exports.getCalificaciones = async (req, res) => {
    try {
        const recipes = await CalificacionService.listaCalificaciones();
        return res.status(200).json({recipes, message: "Calificaciones obtenidas"});
    } catch (e) {
        console.log("Error: " + e.message);
        return res.status(400).json({status: 400, message: "Error al obtener calificaciones"});
    }
}

exports.getCalificacionById = async (req,res) => {
    try {
        const calificacion = await CalificacionService.findRecipeById(req.params.id);
        return res.status(200).json({message: "Calificacion:", calificacion});
    } catch (e) {
        console.log("Error: " + e.message);
        return res.status(400).json({status: 400, message: "Error al obtener calificacion: " + req.params.id});
    }
}

exports.getCalificacionesByReceta = async (req, res) => {
    try {
        const calificaciones = await CalificacionService.findReviewsByRecipe(req.params.id)
        return res.status(200).json({"calificaciones": calificaciones});
    } catch (e) {
        console.log("Error: " + e.message);
        return res.status(400).json({status: 400, message: "Error al obtener calificaciones"});
    }
}

exports.getCalificacionByUser = async (req,res) => {
    try {
        const calificaciones = await CalificacionService.findCalificacionesByUserId(req.params.userId);
        return res.status(200).json({message: "Calificaciones: ", calificaciones});
    } catch (e) {
        console.log("Error: " + e.message);
        return res.status(400).json({status: 400, message: "Error al obtener calificaciones"});
    }
}

exports.createCalificacion = async (req,res) => {
    try {
        const Calificacion = {
            idReceta: req.body.idReceta,
            autor: {
                _id: req.body.autor._id,
                nombre: req.body.autor.nombre,
                email: req.body.autor.email,
                telefono: req.body.autor.telefono,
                idFoto: req.body.autor.idFoto
            },
            puntuacion: req.body.puntuacion,
            comentario: req.body.comentario
        };
        const createdCalificacion = await CalificacionService.nuevaCalificacion(Calificacion);
        return res.status(201).json({message: "Se creó la calificacion para la receta: " + createdCalificacion.idReceta});
    } catch (e) {
        console.log("Error: " + e);
        return res.status(400).json({status: 400, message: "Falló la creación de la receta"});
    }
}

exports.updateCalificacion = async (req,res) => {
    try {
        const calificacion = await CalificacionService.updateCalificacion(req.params.id,{...req.body});
        return res.status(200).json({message: "Calificacion actualizada", calificacion});
    } catch (err) {
        console.log("Error: " + err);
        return res.status(400).json({status: 400, message: "Error al actualizar receta"});
    }
}
