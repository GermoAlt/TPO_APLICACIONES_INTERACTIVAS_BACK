const config = require('./config/env.config.js')
const cors = require('cors')
const bluebird = require('bluebird');

const express = require('express');
const routes = require('./routes/mainRouter')
const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header("Access-Control-Allow-Headers", "access-control-allow-origin, Access-Control-Allow-Headers, " +
        "Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, " +
        "Access-Control-Request-Headers, Authorization, Range");

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());
app.use(cors());

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