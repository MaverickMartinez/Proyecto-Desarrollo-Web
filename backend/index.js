var express = require('express');
var app = express();
var cors = require('cors');
var database = require('./modules/database');
var bodyParser = require('body-parser');
var registroUsuariosRouter = require('./routers/registroUsuarios-router');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/registroUsuarios', registroUsuariosRouter);


app.use(express.static("public"));

app.listen(4444, function(){
    console.log("Servidor Levantado");
});