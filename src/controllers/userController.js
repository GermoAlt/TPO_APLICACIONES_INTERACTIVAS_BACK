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
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        telefono: req.body.telefono,
        idFoto: req.body.idFoto,
        recetas: Array
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
        res.status(200).send("User encontrado");
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
        recetas: req.b.recetas ? req.body.recetas : null
    }
    try {
        let updatedUser = await UserService.updateUser(User)
            return res.status(200).json({status: 200, data: updatedUser, message: "Usuario actualizado correctamente"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}
