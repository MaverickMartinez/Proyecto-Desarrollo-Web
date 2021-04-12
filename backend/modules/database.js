var mongoose = require('mongoose');

let bd = 'proyectoDW';
let port = '27017';
let host = 'localhost';

class Database{
    constructor(){
        this.conectar();
    }
        conectar(){
            mongoose.connect(`mongodb://${host}:${port}/${bd}`)
            .then(result=>console.log('Conexion exitosa a mongodb'))
            .catch(error=>console.log('ocurrio un error'));
        }
}

module.exports = new Database();