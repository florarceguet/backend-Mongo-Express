// Requires
var express = require('express');
var model = require('./../models/usuario');
var bcrypt = require('bcryptjs');
var mwAutenticacion = require('./../middlewares/auth');

// Inicializar variables - 
var app = express();

//Routes
app.get('/', (req, res, next) => {
    model.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errors: err
                    })
                }
                res.status(200).json({
                    ok: true,
                    usuarios
                });
            });
});

app.post('/',mwAutenticacion, (req, res, next) => {
    var body = req.body;
    var usuario = new model({ ...body });
    //encripto la contraseña
    usuario.password = bcrypt.hashSync(usuario.password, 10);

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuarioGuardado
        });

    });

});

app.put('/:id',mwAutenticacion, (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    model.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al traer usuario',
                errors: err
            });
        }

        if (!usuario || usuario.length == 0) {
            if (err) {
                return res.status(404).json({
                    ok: false,
                    mensaje: 'Usuario no encontrado',
                    errors: { message: 'No existe un usuario con el id ' + id }
                });
            }
        }

        usuario.nombre = body.nombre ? body.nombre : usuario.nombre;
        usuario.email = body.email ? body.email : usuario.email;
        usuario.rol = body.rol ? body.rol : usuario.rol;

        usuario.save((err, usuarioActualizado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el usuario',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                usuarioActualizado
            });
        });


    })

});

app.delete('/:id',mwAutenticacion, (req, res, next) => {
    var id = req.params.id;

    model.findByIdAndDelete(id, (err, userDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el usuario',
                errors: err
            });
        }
        if (!userDeleted) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un usuario con ese Id',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            userDeleted
        });
    });
});

module.exports = app;