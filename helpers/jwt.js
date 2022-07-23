const jwt = require('jsonwebtoken'); // Libreria para generar tokens

const generarJWT = ( uid, name ) => {
    return new Promise( (resolve, reject) => {
         const payload = { uid, name }; // Datos que se van a guardar en el token
            jwt.sign(payload, process.env.SECRET_JWT_SEED, { 
                expiresIn: '2h', // Tiempo de expiracion del token
            }, (err, token) => {
                if (err) {
                    reject('Error al generar el token');
                }
                resolve(token);   
            })
    })
            
}



module.exports = {
    generarJWT
}