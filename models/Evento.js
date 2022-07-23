const { Schema, model } = require('mongoose');  



const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, // referencia a un objeto de tipo ObjectId de mongoose (es un id) que se encuentra en la colección de usuarios
        ref: 'Usuario', // referencia a la colección de usuarios
        required: true
    }
});



EventoSchema.method('toJSON', function() { 
    const { __v, _id, ...object } = this.toObject(); // elimina los campos que no queremos que se muestren en el JSON  __v, _id
    object.id = _id; //renombra el campo _id a id
    return object;
});



module.exports = model('Evento', EventoSchema); // Evento es el nombre del modelo que se va a crear en la base de datos y eventoSchema es el esquema que se va a usar para crear el modelo
