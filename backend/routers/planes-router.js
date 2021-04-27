var express = require('express');
var router = express.Router();
var planes = require('../models/planes');

router.get('/',function(req,res){
    planes.find().then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end()
    })
})


module.exports = router;