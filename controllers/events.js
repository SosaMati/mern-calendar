const Evento = require('../models/Evento'); 

const getEventos = async (req, res) => {

    const eventos = await Evento.find() // Busca todos los eventos en la base de datos
                                .populate('user', 'name'); // Popula el campo user con los datos del usuario que creó el evento
    res.json({ 
        ok: true,
        eventos
    });
}


const crearEvento = async (req, res) => {

    const evento = new Evento( req.body );

    try {
        evento.user = req.uid; // id del usuario que crea el evento 
        const eventoGuardado =  await evento.save(); // Guarda el evento en la base de datos 
        res.json({ 
            ok: true,
            evento: eventoGuardado
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el evento'
        });
    } 
}



const actualizarEvento = async (req, res) => {

    const eventoId = req.params.id; // id del evento que se va a actualizar
    const uid = req.uid; // id del usuario que actualiza el evento

    try {
        const evento = await Evento.findById(eventoId); // Busca el evento en la base de datos
        if(!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permiso para actualizar este evento'
            }); // Si el usuario que actualiza el evento no es el mismo que creó el evento, no puede actualizarlo
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        } // Crea un nuevo objeto con los datos del evento que se va a actualizar

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true }); // Actualiza el evento en la base de datos y devuelve el evento actualizado 

        res.json({ 
            ok: true,
            evento: eventoActualizado
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el evento'
        });
    }
}


const eliminarEvento = async(req, res) => {

    const eventoId = req.params.id; // id del evento que se va a eliminar
    const uid = req.uid; // id del usuario que elimina el evento

    try {
        const evento = await Evento.findById(eventoId); // Busca el evento en la base de datos
        if(!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }

        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permiso para eliminar este evento'
            }); // Si el usuario que elimina el evento no es el mismo que creó el evento, no puede eliminarlo
        }
        
        await Evento.findByIdAndDelete(eventoId); // Elimina el evento de la base de datos

        res.json({ 
            ok: true
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el evento'
        });
    }
}




module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}