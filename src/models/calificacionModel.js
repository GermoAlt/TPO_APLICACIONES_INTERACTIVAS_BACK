const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const CalificacionSchema = new mongoose.Schema({
    idReceta: String,
    autor: {
        _id: String,
        nombre: String,
        email: String,
        telefono: String,
        idFoto: String
    },
    puntuacion: Number,
    comentario: String
})

CalificacionSchema.plugin(mongoosePaginate)

const Calificacion = mongoose.model('Calificacion', CalificacionSchema)

module.exports = Calificacion;