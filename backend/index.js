var express = require('express');
var app = express();
var cors = require('cors');
var database = require('./modules/database');
var bodyParser = require('body-parser');
var usuario = require('./routers/registroUsuarios-router');
var planes = require('./routers/planes-router');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/usuarios', usuario);
app.use('/planes', planes);


app.use(express.static("public"));

app.listen(4444, function(){
    console.log("Servidor Levantado");
});