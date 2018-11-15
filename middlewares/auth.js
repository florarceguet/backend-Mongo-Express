var seed = require('./../config/config').SEED;
var jwt = require('jsonwebtoken');

// =========================================================================================================
// Verificar token
// =========================================================================================================

exports.verificarToken = function (req, res, next) {
    var token = req.query.token;

    jwt.verify(token, seed, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Error con el token',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next(); //indica que puede seguir con las siguientes funciones
    });
}



