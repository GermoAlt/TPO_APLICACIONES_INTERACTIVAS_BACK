const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const UserSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    email: String,
    password: String,
    telefono: String,
    idFoto: String,
    recetas: Array,
    token: String,
    date: Date
});

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;