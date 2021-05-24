const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 5050;

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
//import modules
const bodyParser = require("body-parser");
const router = require('./routes/main.routes.js');

//
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.listen(port, function (err) {
    if (!err) {
        console.log('Servidor no Host ' + host + ' e PORT ' + port);
    }
    else {
        console.log(err);
    }
})

module.exports = app;

