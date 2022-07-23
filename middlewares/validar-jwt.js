const jwt = require('jsonwebtoken'); // Libreria para generar tokens

const validarJWT = (req, res, next) => {
    const token = req.header('x-token'); // Obtiene el token del header

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid, name } = jwt.verify(
            token,  // Token que se va a validar
            process.env.SECRET_JWT_SEED // Se pasa el secret que se genero en el archivo .env
        ); // Verifica el token


        req.uid = uid; // Guarda el uid en el request
        req.name = name; // Guarda el nombre en el request

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

    next();
}



module.exports = {
    validarJWT
}