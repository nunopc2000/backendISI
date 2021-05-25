const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 8080;

const express = require('express');
const path = require ("path")
const cors = require('cors');

const app = express();

app.use(cors())
//import modules
const bodyParser = require("body-parser");
const router = require('./routes/main.routes.js');

//
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.use(express.static(path.join(__dirname, "/frontend", "Frontoffice")));
app.use(express.static(path.join(__dirname, "/frontend", "Backoffice")));

//app.use('/public', express.static('public'));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "/frontend/","Frontoffice","index.html"))
})

app.listen(port, function (err) {
    if (!err) {
        console.log('Servidor no Host ' + host + ' e PORT ' + port);
    }
    else {
        console.log(err);
    }
})

module.exports = app;

