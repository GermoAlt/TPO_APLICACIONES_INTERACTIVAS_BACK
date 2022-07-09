const config = require('./config/env.config.js')
const bluebird = require('bluebird');

const express = require('express');
const routes = require('./routes/userRoute')
const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});


//Database
const mongoose = require('mongoose');
mongoose.Promise = bluebird;
let url = `${config.URI}${config.HOST}:${config.PORTDB}/${config.DATABASE}`
console.log("BD",url);
let opts = {
    useNewUrlParser : true,
    connectTimeoutMS:20000,
    useUnifiedTopology: true
};

mongoose.connect(url,opts)
    .then(() => {
        console.log(`Succesfully Connected to theMongodb Database..`)
    })
    .catch((e) => {
        console.log(`Error Connecting to the Mongodb Database...`),
            console.log(e)
    })

app.use('/', routes)