// Requires

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//routes
var appRoutes = require('./routes/index');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

// Inicializar variables - 
var app = express();

// Configuraciones
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/usuario',usuarioRoutes);
app.use('/login',loginRoutes);
app.use('/',appRoutes);


// DB connection
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) {
        throw err;
    }else{
        console.log('Database: \x1b[32m%s\x1b[0m', 'online')
    }
}); //es el puerto por defecto de mongo



// Escuchar peticiones dentro de qué puerto
app.listen(3000, () => {
    console.log('\nExpress Server is listening at port 3000: \x1b[32m%s\x1b[0m', 'online');
});