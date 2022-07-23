const express = require('express');
require('dotenv').config(); //guarda en una variable el archivo .env
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crea el servidor express 
const app = express(); 

//Base de datos
dbConnection();

//CORS
app.use(cors()); //permite que se pueda acceder a la API desde cualquier origen (dominio)

//Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json()); 

//Rutas 
app.use('/api/auth', require('./routes/auth')); //ruta de autenticacion de usuario 
app.use('/api/events', require('./routes/events')); //ruta de eventos

//Escuchar peticiones
const port = process.env.PORT || 4000;
app.listen( port, () => {
    console.log(`Server on port ${ port }`);
}
);

