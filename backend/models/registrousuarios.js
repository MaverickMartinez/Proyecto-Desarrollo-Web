var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
//aqui va la estructura de las variables de la coleccion de registro de usuarios
});

module.exports = mongoose.model('registroUsuarios', esquema);