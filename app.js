// Requires

var express = require('express');
var mongoose = require('mongoose');

// Inicializar variables - 
var app = express();

// DB connection

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) {
        throw err;
    }else{
        console.log('Database: \x1b[32m%s\x1b[0m', 'online')
    }
}); //es el puerto por defecto de mongo


//Routes
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente',
    });

});

// Escuchar peticiones dentro de qué puerto

app.listen(3000, () => {
    console.log('\nExpress Server is listening at port 3000: \x1b[32m%s\x1b[0m', 'online');
});