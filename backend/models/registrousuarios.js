var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    nombreRegistro:String,
    apellidoRegistro:String,
    correoRegistro:{type:String,unique:true},
    claveRegistro1:String,
    carpetas: mongoose.SchemaTypes.Array,
    snippets: mongoose.SchemaTypes.Array,
    plan:mongoose.SchemaTypes.ObjectId,
    nCarpetas:String,
    nProyectos:String,
    nSnippets:String
});

module.exports = mongoose.model('registroUsuarios', esquema);



  
  