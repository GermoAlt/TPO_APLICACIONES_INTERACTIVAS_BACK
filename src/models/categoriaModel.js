const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const CategoriaSchema = new mongoose.Schema({
    idCategoria: Number,
    nombre: String,
    idRecetas: Array
})

CategoriaSchema.plugin(mongoosePaginate)

const Categoria = mongoose.model('Categoria', CategoriaSchema)

module.exports = Categoria;