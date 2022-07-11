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
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        telefono: req.body.telefono
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