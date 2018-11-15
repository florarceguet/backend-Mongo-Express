var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var app = express();
var UsuarioModel = require('./../models/usuario');
var seed = require('./../config/config').SEED;

app.post('/', (req, res) => {
    var body = req.body;
    UsuarioModel.findOne({ email: body.email }, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error buscando un usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                mensaje: 'El usuario no existe',
                errors: err
            });
        }

        if (!usuario.password) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Debe ingresar una contraseña',
                errors: err
            });
        }
        if (!bcrypt.compareSync(body.password, usuario.password)) {
            return res.status(401).json({
                ok: false,
                mensaje: 'La contraseña es inválida',
                errors: err
            });
        }

        // =========================================================================================================
        // generamos token -- jsonwebtoken - jwt.io
        // =========================================================================================================
        var token = jwt.sign({ usuario }, seed, { expiresIn: 14000 });
        res.status(200).json({
            ok: true,
            mensaje: 'Login ok',
            token,
            usuario

        });


    });


});

module.exports = app;