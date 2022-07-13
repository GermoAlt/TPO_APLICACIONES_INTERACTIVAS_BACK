const Calificacion = require('../models/calificacionModel');


exports.listaCalificaciones = async () => {
    try{
        return await Calificacion.find();;
    }catch(e){
        console.log("Error calificaciones: " + e.message);
        throw Error("Error obtinedo calificaciones")
    }
}

exports.findCalificacionById = async (id) => {
    try{
        return await Recipe.findOne({"id":id});
    }catch(e){
        console.log("Error: " + e.message);
        throw Error("Error al obtener calificacion: " + id)
    }
}

exports.findCalificacionByUserId = async (userId) => {
    try{
        return  await Calificacion.find({"datosUsuario.idUser":userId});
    }catch(e){
        console.log("Error: " + e.message);
        throw Error("Error al obtener calificaciones del usuario: " + userId)
    }
}

exports.nuevaCalificacion = async (calificacion) => {
    try{
        const nuevaCalificacion = new Calificacion({
            ...calificacion,
            date: new Date(),
        });
        return await nuevaCalificacion.save()
    }
    catch(e){
        console.log("Error: " + e.message);
        throw Error("Error al crear calificacion")
    }
}

exports.updateCalificacion = async (id,nuevaCalificacion) => {
    try{
        return  await Calificacion.updateOne({"_id":id},nuevaCalificacion);
    }catch(e){
        console.log("Error: " + e.message);
        throw Error("Error al actualizar calificacion")
    }

}
