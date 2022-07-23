const { Schema, model } = require('mongoose');  



const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // No se puede repetir
    },
    password: {
        type: String,
        required: true
    }
});



module.exports = model('Usuario', UsuarioSchema); // Usuario es el nombre del modelo que se va a crear en la base de datos y usuarioSchema es el esquema que se va a usar para crear el modelo
