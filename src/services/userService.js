const User = require('../models/userModel')
const Prueba = require('../models/pruebaModel')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const config = require('../config/env.config.js')

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
    return await loginUser(user)
}

async function loginUser(user) {
    try {
        console.log("login:",user)
        const detailsUser = await User.findOne({
            email: user.email
        });
        const passwordIsValid = bcrypt.compareSync(user.password, detailsUser.password);
        if (!passwordIsValid) throw Error("Username o password incorrecto")

        let token = jwt.sign({
            id: detailsUser._id
        }, config.SECRET, {
            expiresIn: '1h'
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
        password: hashedPassword,
        telefono: user.telefono,
        idFoto: user.idFoto
    });

    try {
        const savedUser = await newUser.save();
        console.log("usuario creado: ", savedUser);
        const token = jwt.sign({
            id: savedUser._id
        }, config.SECRET, {
            expiresIn: '1h'
        });
        return {token: token, id: savedUser._id};
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
    }

    if(user.password) userEncontrado.password = bcrypt.hashSync(user.password, 8)
    userEncontrado.nombre = user.nombre
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

exports.findUserByEmail = async (email) => {
    try{
        let user = await User.findOne({"email": email});
        return user;
    }
    catch(err){
        throw Error("Error al buscar user por email: " + e.message);
    }
}

exports.updateUserToken = async (user,token) => {
    try{
        let id = user._id.valueOf();
        user.token = token;
        const updateUserAction = await User.updateOne({"_id":id},user);
        return updateUserAction;
    }catch(err){
        console.log("Error: " + err);
        throw Error("Error al actualizar token del usuario")
    }
}

exports.sendEmail = async (email,token) => {
    try{
        let transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            port: 587, // port for secure SMTP
            secureConnection: false,
            tls: {
                ciphers: 'SSLv3'
            },
            auth: {
                user: config.EMAIL_USER,
                pass: config.EMAIL_PASSWORD
            }
       });
        let clickThroughUrl = "http://localhost:3000/reset?uuid="+ token;
        var mailOptions = {
            from: 'Gourmetic',
            to: email,
            subject: 'Recuperación de Cuenta',
            text: 'Ingrese al siguiente link para recuperar su clave: ' + clickThroughUrl
        };
        transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                throw Error("Error durante el envío del email: " + error.message);
            } else {
                console.log("Email enviado correctamente")
                return info;
            }
       });
    }
    catch(err){
        throw Error("Ocurrió un error al enviar email: " + error.message);
    }
}

exports.findUserWithToken = async (token) => {
    try{
        let user = await User.findOne({"token": token})
        return user;
    }catch(err){
        throw Error("Error al buscar usuario durante validación del token")
    }
}

exports.updateUserPassword = async (user,password) => {
    try{
        let id = user._id.valueOf();
        user.token = "";
        user.password = bcrypt.hashSync(password, 8);
        await User.updateOne({"_id": id},user)
        user.password = password
        return loginUser(user);
    }catch(err){
        throw Error("Error al actualizar la contraseña del usuario")
    }
}