/*
Event Routes
/api/events
*/ 
const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const router = express.Router();  //crea una instancia de express.Router()

router.use( validarJWT ); // Se ejecuta el middleware validarJWT antes de ejecutar cualquier ruta

//Obtener todos los eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(), 
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de fin es obligatoria').custom( isDate ),
        validarCampos

    ], // Se pasa un array de validaciones
    crearEvento
    );

//Actualizar un evento
router.put('/:id', actualizarEvento);

//Eliminar un evento
router.delete('/:id', eliminarEvento);


module.exports = router;