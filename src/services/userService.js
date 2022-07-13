const User = require('../models/userModel')
const Prueba = require('../models/pruebaModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


exports.crearPrueba = async function (prueba){
    const newPrueba = new Prueba({
        name: prueba.name,
        detalle: prueba.detalle,
        date: new Date()
    });
    try {
        const guardarPrueba = await newPrueba.save();
    }catch (e){
        console.log(e)
        throw Error(e.getError())
    }
}

exports.login = async function (user) {
    try {
        console.log("login:",user)
        const detailsUser = await User.findOne({
            email: user.email
        });
        const passwordIsValid = bcrypt.compareSync(user.password, detailsUser.password);
        if (!passwordIsValid) throw Error("Username o password incorrecto")

        let token = jwt.sign({
            id: detailsUser._id
        }, process.env.SECRET, {
            expiresIn: 10
        });
        return {token:token, user:detailsUser};
    } catch (e) {
        throw Error("Error login user")
    }

}

exports.nuevoUser = async function (user) {
    const hashedPassword = bcrypt.hashSync(user.password, 8);

    const newUser = new User({
        nombre: user.nombre,
        email: user.email,
        date: new Date(),
        password: hashedPassword
    });

    try {
        const savedUser = await newUser.save();
        const token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 10
        });
        return token;
    } catch (e) {
        console.log(e)
        throw Error("Error creando nuevo user")
    }
}

exports.findById = async function (id) {
    try {
        let user = await User.findById({
            _id: id
        })
        if (user.n === 0 && user.ok === 1) {
            throw Error("No se encontro el user")
        }
        return user;
    } catch (e) {
        throw Error("Error buscando el user: " + e.message)
    }
}

exports.updateUser = async function (user) {
    let id = {
        email: user.email
    }
    try {
        var userEncontrado = await User.findOne(id);
    } catch (e) {
        throw Error("Error buscan el user: " + e.message)
        return false;
    }

    let hashedPassword = bcrypt.hashSync(user.password, 8);
    userEncontrado.name = user.name
    userEncontrado.email = user.email
    userEncontrado.password = hashedPassword
    userEncontrado.telefono = user.telefono
    userEncontrado.idFoto =  user.idFoto
    userEncontrado.recetas = user.recetas
    userEncontrado.date = new Date()
    try {
        let savedUser = await userEncontrado.save()
        return savedUser;
    } catch (e) {
        throw Error("Error guardando el user: " + e.message);
    }
}