const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const CalificacionSchema = new mongoose.Schema({
    idCalificacion: Number,
    idReceta: Number,
    datosUsuario: {
        idUsuario: Number,
        nombre: String,
        email: String,
        telefono: String,
        idFoto: String
    },
    puntacion: Number,
    comentario: String
})

CalificacionSchemaSchema.plugin(mongoosePaginate)

const Calificacion = mongoose.model('Calificacion', CalificacionSchema)

module.exports = Calificacion;