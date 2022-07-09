var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PruebaSchema = new mongoose.Schema({
    name: String,
    detalle: String,
    date: Date
})
PruebaSchema.plugin(mongoosePaginate)
const Prueba = mongoose.model('Prueba', PruebaSchema)

module.exports = Prueba;