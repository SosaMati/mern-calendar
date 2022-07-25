const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');




const crearUsuario = async (req, res) => {
    const { email, password } = req.body; 
    try {

        let usuario = await Usuario.findOne({ email }); // Busca un usuario con el email que se le pasa por parametro

        if (usuario) { // Si el usuario existe
            return res.status(400).json({ // Devuelve un error
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        usuario = new Usuario( req.body ); // Crea un nuevo usuario con los datos que se le pasan por parametro

        // Encripta la contraseña
        const salt = bcrypt.genSaltSync();  
        usuario.password = bcrypt.hashSync(password, salt); // Encripta la contraseña

    
        await usuario.save(); // Guarda el usuario en la base de datos

        // Genera un token
        const token = await generarJWT(usuario.id, usuario.name); 
    
        res.status(201).json({ // Devuelve una respuesta 201 (created)
            ok: true,
            uid: usuario.id,
            usuario: usuario.name,
            token
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
}


const loginUsuario = async (req, res) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email }); // Busca un usuario con el email que se le pasa por parametro

        if (!usuario) { // Si el usuario no existe
            return res.status(400).json({ // Devuelve un error
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        // Compara la contraseña que se le pasa por parametro con la contraseña que se encuentra en la base de datos
        const validPassword = bcrypt.compareSync(password, usuario.password); 

        if (!validPassword) { // Si la contraseña no es valida
            return res.status(400).json({ // Devuelve un error
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }

        // Genera un token
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            usuario: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        }); 
    }
}
 
const revalidarToken = async(req, res) => { // Funcion para revalidar el token

    const uid = req.uid; // Obtiene el uid del request
    const name = req.name; // Obtiene el nombre del request

    const token = await generarJWT(uid, name); // Genera un nuevo token


    res.json({ // Devuelve una respuesta
        ok: true,
        uid,
        name,
        token 
    })
}






module.exports = { 
    crearUsuario,
    loginUsuario,
    revalidarToken
};