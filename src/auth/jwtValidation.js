const jwt = require('jsonwebtoken');
const config = require('../config/env.config');

exports.checkToken = (req,res,next) => { // si todo va bien, hago next y voy al siguiente manejador de rutas

    if (!req.headers['token']){
        return res.status(401).json({ error: 'Necesitas incluir el token en el header'})
    }

    const userToken = req.headers['token'];

    try{
        let payload = jwt.verify(userToken, config.SECRET)
    }catch(err){
        return res.status(401).json({error : 'El token es inválido'});
    }

    next();
}