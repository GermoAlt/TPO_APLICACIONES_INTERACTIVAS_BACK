const UserService = require('../services/userService');

exports.testPepe = async function (req, res){
    const Prueba = {
        name: req.body.name,
        detalle: req.body.detalle
    };
    try{
        const createdPrueba = await UserService.crearPrueba(Prueba);
        return res.status(200).json({message:"Post ok"})
    }catch (e){
        console.log(e)
        return  res.status(401).json({status: 400, message:"Error con db"})
    }

}

exports.nuevoUser = async function (req, res) {
    const User = {
        nombre: req.body.nombre ? req.body.nombre : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null,
        telefono: req.body.telefono ? req.body.telefono :null,
        idFoto: req.body.idFoto ? req.body.idFoto : null,
        token: req.body.token ? req.body.token : null,
        recetas: [],
    };
    try {
        const createdUser = await UserService.nuevoUser(User);
        return res.status(201).json({createdUser, message: "Se creó el usuario: " + User.email});
    } catch (e) {
        console.log("Error: " + e);
        return res.status(400).json({status: 400, message: "Falló la creación de usuario"});
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
    if (!req.body.nombre) {
        return res.status(400).json({status: 400., message: "Name be present"})
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
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.reset = async (req,res) => { // received email => checks for existace, saves token, and sends mail
    try {
        const targetUser = await UserService.findUserByEmail(req.body.email);
        /*if(targetUser === {}){
            return res.status(404).json({status: 404, message: "No se encontró al usuario"});
        }*/
        if(!targetUser){
            return res.status(200).json({status: 200, message: "Request aceptada, pero no inmuta al sistema"});
        }
        const updatedTokenAction = await UserService.updateUserToken(targetUser,req.body.token)
        const emailActionInfo = await UserService.sendEmail(req.body.email,req.body.token)
        return res.status(200).json({targetUser,emailActionInfo, message: "Se envio el mail al usuario: " + targetUser.email});
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
        let updateAction = await UserService.updateUserPassword(user,req.body.password);
        return res.status(200).json({updateAction, message: "Contraseña actualizada con éxito"});
    }catch(err){
        console.log("Error: ", err);
        return res.status(400).json({status: 400, message: "Falló la autenticación del token (uuid: " + req.body.token + ")"});
    }
}