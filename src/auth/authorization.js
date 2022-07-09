/**
 * @type {Module jsonwebtoken|Module jsonwebtoken}
 * @author | Mohammad Raheem
 */
const jwt = require('jsonwebtoken');
const config = require('../config/env.config')
const authorization = function (req, res, next) {

    const token = req.headers['x-access-token'];
    console.log("token", token);
    const msg = {auth: false, message: 'No token provided.'};
    if (!token)
        res.status(500).send(msg);

    let sec = config.SECRET;
    //console.log("secret",sec)
    try {
        jwt.verify(token, sec, function (err, decoded) {
            const msg = {auth: false, message: err.message};
            if (err)
                res.status(500).send(msg);
            req.userId = decoded.id;
            next();
        });
    } catch (e){
        console.log(e)
    }

};

module.exports = authorization;

