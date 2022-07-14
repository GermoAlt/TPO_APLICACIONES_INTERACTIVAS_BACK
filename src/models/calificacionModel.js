const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const CalificacionSchema = new mongoose.Schema({
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

CalificacionSchema.plugin(mongoosePaginate)

const Calificacion = mongoose.model('Calificacion', CalificacionSchema)

module.exports = Calificacion;