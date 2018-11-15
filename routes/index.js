// Requires

var express = require('express');

// Inicializar variables - 
var app = express();
//Routes
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente',
    });

});

module.exports = app;