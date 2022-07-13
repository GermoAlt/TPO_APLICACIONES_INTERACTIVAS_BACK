const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const RecetaSchema = new mongoose.Schema({
    id: Number,
    autor: {
        id: Number,
        nombre:String,
        email:String,
        idFoto:String,
        telefono:String
    },
    titulo: String,
    descripcion: String,
    imagenes: Array,
    dificultad: Number,
    categorias: Array,
    tiempoPreparacion: Number,
    tiempoElaboracion: Number,
    porciones: Number,
    ingredientes: [{
        cantidad: String,
        ingrediente: String
    }],
    pasos: [{
        orden: Number,
        paso: String
    }],
    date: Date,
    rating: Array,
    estado: String
});

RecetaSchema.plugin(mongoosePaginate)
const Receta = mongoose.model('Receta', RecetaSchema)

module.exports = Receta;