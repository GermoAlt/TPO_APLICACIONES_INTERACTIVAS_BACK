const UserService = require('../services/userService');

exports.nuevoUser = async function (req, res) {
    const User = {
        nombre: req.body.user.nombre ? req.body.user.nombre : null,
        email: req.body.user.email ? req.body.user.email : null,
        password: req.body.user.password ? req.body.user.password : null,
        telefono: req.body.user.telefono ? req.body.user.telefono :null,
        idFoto: req.body.user.idFoto ? req.body.user.idFoto : null,
        token: req.body.user.token ? req.body.user.token : null,
        recetas: [],
    };
    try {
        const createdUser = await UserService.nuevoUser(User);
        User.password = null
        User._id = createdUser.id
        return res.status(201).json({createdUser, message: "Se creó el usuario: " + User.email, user: User});
    } catch (e) {
        console.log("Error: " + e);
        return res.status(409).json({status: 400, message: "Ya existe un usuario con este mail"});
    }
}

exports.login = async function (req, res) {
    const User = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        const loginUser = await UserService.login(User);
        return res.status(200).json({loginUser, message: "Login ok"});
    } catch (e) {
        return res.status(401).json({status: 401, message: "Username o password incorrecto"});
    }
}

exports.getUserById = async function (req, res) {
    const id = req.params.id;
    try {
        let user = await UserService.findById(id);
        res.status(200).json({user,message: "User encontrado"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.updateUser = async function (req, res) {
    if (!req.body.email) {
        return res.status(400).json({status: 400, message: "Email must be present"})
    }
    let User = {
        nombre: req.body.nombre ? req.body.nombre : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null,
        telefono: req.body.telefono ? req.body.telefono :null,
        idFoto: req.body.idFoto ? req.body.idFoto : null,
        recetas: req.body.recetas ? req.body.recetas : null,
        token: req.body.token ? req.body.token : null
    }
    try {
        let updatedUser = await UserService.updateUser(User)
            return res.status(200).json({status: 200, data: updatedUser, message: "Usuario actualizado correctamente"})
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.reset = async (req,res) => { // received email => checks for existace, saves token, and sends mail
    try {
        const targetUser = await UserService.findUserByEmail(req.body.email);
        if(!targetUser){
            return res.status(200).json({status: 200, message: "Request aceptada, pero no inmuta al sistema"});
        }
        await UserService.updateUserToken(targetUser,req.body.token)
        await UserService.sendEmail(req.body.email,req.body.token)
        return res.status(200).json({message: "Se envio el mail al usuario: " + targetUser.email});
    } catch (e) {
        console.log("Error: ", e);
        return res.status(400).json({status: 400, message: "Falló la recuperación de usuario"});
    }
}

exports.validateUserToken = async (req,res) => { // Checks if there's a user with provided token, and returns it
    try{
        let user = await UserService.findUserWithToken(req.body.token)
        if(!user){
            return res.status(401).json({message: "No se encontró al usuario con token " + req.body.token});
        }
        return res.status(200).json({user, message: "Se encontró al usuario con token " + user.token});
    }catch(err){
        console.log("Error: ", err);
        return res.status(400).json({status: 400, message: "Falló la autenticación del token (uuid: " + req.body.token + ")"});
    }
}

exports.updatePassword = async (req,res) => { // Updates user password, sets token as empty
    try{
        let user = await UserService.findUserWithToken(req.body.token)
        if(!user){
            return res.status(401).json({message: "No se encontró al usuario con token " + req.body.token});
        }
        user = await UserService.updateUserPassword(user,req.body.password);
        return res.status(200).json({user, message: "Contraseña actualizada con éxito"});
    }catch(err){
        console.log("Error: ", err);
        return res.status(400).json({status: 400, message: "Falló la autenticación del token (uuid: " + req.body.token + ")"});
    }
}