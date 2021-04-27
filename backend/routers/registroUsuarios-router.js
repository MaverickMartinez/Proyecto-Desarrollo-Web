var express = require('express');
var router = express.Router();
var usuario = require('../models/registrousuarios');
var moongoose = require('mongoose');

//registrar
router.post('/signUp',function(req,res){
    let u = new usuario({
        
        nombreRegistro:req.body.nombreRegistro,
        apellidoRegistro:req.body.apellidoRegistro,
        correoRegistro:req.body.correoRegistro,
        claveRegistro1:req.body.claveRegistro1,
        carpetas:[],
        snippets:[]
    });
    u.save().then(result=>{
        res.json({codigo:1,user:result._id,mensaje:"Usuario registrado"});
        res.end();
    }).catch(error=>{
        res.json({codigo:0,mensaje:"no se pudo registrar"});
        res.end();
    })
});

//asignar planes
router.put('/:idUsuario/planes' ,function(req,res){
    usuario.updateOne(
        { 
          _id:mongoose.Types.ObjectId(req.params.idUsuario) 
        },
        { 
            plan:mongoose.Types.ObjectId(req.body.idPlan)
        })
    .then(result=>{
            res.send(result);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        })
  
});

//asignar limites del plan
router.put('/:idUsuario/valoresPlan', function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },{
            nCarpetas:req.body.nCarpetas,
            nProyectos:req.body.nProyectos,
            nSnippets:req.body.nSnippets
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end()
    })
})


//obtener valores del plan 
router.get('/:idUsuario/planes', function(req,res){
    usuario.aggregate([
        {
            $lookup:{
                from:'planes',
                localField:'plan',
                foreignField:'_id',
                as:'plan'
            }
        },{
            $match:{
                _id:mongoose.Types.ObjectId(req.params.idUsuario)
            }
        }  
    ]).then(result=>{
        res.send(result[0].plan[0]);
        res.end()
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})

//obtener un usuario
router.get('/:idUsuario', function(req,res){
    usuario.findOne({
        _id:mongoose.Types.ObjectId(req.params.idUsuario)
    },{carpetas:false,snippets:false}).then(result=>{
        res.send(result);
        res.end()
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})

//actualizar perfil de usuario
router.put('/:idUsuario/actualizarPerfil' ,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },
        {
           
            nombreRegistro:req.body.nombreRegistro,
            apellidoRegistro:req.body.apellidoRegistro,
            correoRegistro:req.body.correoRegistro
           
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})
//cambiar clave
router.put('/:idUsuario/cambiarPass', function(req,res){

    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },{
            claveRegistro1:req.body.claveRegistro1
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
})

//crear una carpeta
router.put('/:idUsuario' ,function(req,res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },
        {
            $push:{
                carpetas:{
                    _id:mongoose.Types.ObjectId(),
                    nombreCarpeta:req.body.nombreCarpeta,
                    descripcion:req.body.descripcion,
                    proyectos:[]
                }
            }
        }).then(result=>{
            res.send(result);
            res.end()
        }).catch(error=>{
            res.send(error);
            res.end();
        })
});
//eliminar una carpeta
router.put('/:idUsuario/carpetas/:idCarpeta/eliminar' ,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario),
            "carpetas._id":mongoose.Types.ObjectId(req.params.idCarpeta)
        },
        {
            $pull:{
                "carpetas":{_id:mongoose.Types.ObjectId(req.params.idCarpeta)}
            }
        }).then(result=>{
            res.send(result);
            res.end()
        }).catch(error=>{
            res.send(error);
            res.end();
        })
});

//reducir el numero de carpetas permitidas
router.put('/:idUsuario/actualizarCarpetas' ,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },{
            nCarpetas:req.body.nCarpetas
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();

    })
});

////////////////////////////////////////////////////////
//obtener todas las carpetas
router.get('/:idUsuario/carpetas' ,function(req,res){
    usuario.findOne(
        {
            _id:req.params.idUsuario
        },{
            _id:true,
            carpetas:true,
            nCarpetas:true,
        }).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});



//obtener todos los proyectos de una carpeta 
router.get('/:idUsuario/carpetas/:idCarpeta/proyectos' ,function(req,res){
    usuario.findOne(
        {
            _id:req.params.idUsuario,
            "carpetas._id":mongoose.Types.ObjectId(req.params.idCarpeta)
        },{
            "carpetas.$":true
        }).then(result=>{
            res.send(result.carpetas[0]);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        });
});
//obtener el numero de proyectos restantes
router.get('/:idUsuario/proyectosRestantes' ,function(req,res){
    usuario.findOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },{
            nProyectos:true
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});
//actualizar el numero de proyectos permitidos
router.put('/:idUsuario/actualizarProyectos' ,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },{
            nProyectos:req.body.nProyectos
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();

    });
}); 

//obtener un proyecto de una carpeta
router.get('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto' ,function(req,res){
    usuario.aggregate([
    { $unwind: '$carpetas' },
    { $match: {'carpetas._id':mongoose.Types.ObjectId(req.params.idCarpeta)}},
    {
        $project: {
            'filteredValue':{
                $filter: {
                  input: "$carpetas.proyectos",
                  as: "proyRequerido",
                  cond: { $eq: [ '$$proyRequerido._id', mongoose.Types.ObjectId(req.params.idProyecto) ] }
                }
            }
        }
    }
    ]).then(result=>{
            res.send(result[0].filteredValue[0]);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        });
});

//crear un proyecto en una carpeta
router.put('/:idUsuario/carpetas/:idCarpeta/proyectos' ,function(req,res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario),
            "carpetas._id":mongoose.Types.ObjectId(req.params.idCarpeta)
        },
        {
            $push:{
                "carpetas.$.proyectos":{
                    _id:mongoose.Types.ObjectId(),
                    nombreProyecto:req.body.nombreProyecto,
                    descripcion:req.body.descripcion,
                    codigoHtml:'',
                    codigoCss:'',
                    codigoJs:''
                }
            }
        }).then(result=>{
            res.send(result);
            res.end()
        }).catch(error=>{
            res.send(error);
            res.end();
        })
});
//eliminar proyectos
router.put('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto/eliminar' ,function(req,res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario),
            "carpetas._id":mongoose.Types.ObjectId(req.params.idCarpeta),
            "carpetas.proyectos._id":mongoose.Types.ObjectId(req.params.idProyecto) 
        },
        {
            $pull:{
                "carpetas.$.proyectos":{_id:mongoose.Types.ObjectId(req.params.idProyecto) }
            }
        }).then(result=>{
            res.send(result);
            res.end()
        }).catch(error=>{
            res.send(error);
            res.end();
        })
});


//guardar codigo en un proyecto
router.put('/:idUsuario/carpetas/:idCarpeta/proyectos/:idProyecto' ,function(req,res){
    usuario.updateOne(
        { 
          "_id":mongoose.Types.ObjectId(req.params.idUsuario), 
          "carpetas._id":mongoose.Types.ObjectId(req.params.idCarpeta), 
          "carpetas.proyectos._id":mongoose.Types.ObjectId(req.params.idProyecto) 
        },
        { 
          "$set":{ 'carpetas.$[i].proyectos.$[j].codigoHtml':req.body.codigoHtml,
          'carpetas.$[i].proyectos.$[j].codigoCss':req.body.codigoCss,
          'carpetas.$[i].proyectos.$[j].codigoJs':req.body.codigoJs}},{arrayFilters:[{"i._id":mongoose.Types.ObjectId(req.params.idCarpeta)},{"j._id":mongoose.Types.ObjectId(req.params.idProyecto) }]}
      )
    .then(result=>{
            res.send(result);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        })
});

//crear un snippet
router.put('/:idUsuario/snippets' ,function(req,res){
    usuario.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },
        {
            $push:{
                snippets:{
                    _id:mongoose.Types.ObjectId(),
                    nombreSnippet:req.body.nombreSnippet,
                    descripcion:req.body.descripcion,
                    lenguaje:req.body.lenguaje,
                    codigo:''
                }
            }
        }).then(result=>{
            res.send(result);
            res.end()
        }).catch(error=>{
            res.send(result);
            res.end();
        })
});

//obtener todos los snippets
router.get('/:idUsuario/snippets' ,function(req,res){
    usuario.findOne(
        {
            _id:req.params.idUsuario
        },{
            _id:true,
            snippets:true,
            nSnippets:true
        }).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    })
});

//eliminar una carpeta
router.put('/:idUsuario/snippets/:idSnippet/eliminar' ,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario),
            "snippets._id":mongoose.Types.ObjectId(req.params.idSnippet)
        },
        {
            $pull:{
                "snippets":{_id:mongoose.Types.ObjectId(req.params.idSnippet)}
            }
        }).then(result=>{
            res.send(result);
            res.end()
        }).catch(error=>{
            res.send(error);
            res.end();
        });
});

//actualizar numero de snippets permitidos
router.put('/:idUsuario/actualizarSnippets' ,function(req,res){
    usuario.updateOne(
        {
            _id:mongoose.Types.ObjectId(req.params.idUsuario)
        },{
            nSnippets:req.body.nSnippets
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();

    });
}); 

//obtener un snippet
router.get('/:idUsuario/snippets/:idSnippet' ,function(req,res){
    usuario.findOne(
        {
            _id:req.params.idUsuario,
            "snippets._id":mongoose.Types.ObjectId(req.params.idSnippet)
        },{
            "snippets.$":true
        }).then(result=>{
            res.send(result.snippets[0]);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        });
});
//guardar codigo de un snippet
router.put('/:idUsuario/snippets/:idSnippet' ,function(req,res){
    usuario.updateOne(
        { 
          "_id":mongoose.Types.ObjectId(req.params.idUsuario), 
          "snippets._id":mongoose.Types.ObjectId(req.params.idSnippet), 
        },
        { 
          "$set":{ 'snippets.$.codigo':req.body.codigo}
        })
    .then(result=>{
            res.send(result);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        });
});



module.exports = router;