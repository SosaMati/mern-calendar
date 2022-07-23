/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
 
const router = express.Router(); 


router.post(
    '/new', 
    [ //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio y debe tener al menos 6 caracteres').not().isEmpty().isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario 
);

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio y debe tener al menos 6 caracteres').not().isEmpty().isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario 
);


router.get('/renew', validarJWT, revalidarToken); // Si el token es valido, se va a renovar el token


module.exports = router; //exporta el router para que sea visible en index.js