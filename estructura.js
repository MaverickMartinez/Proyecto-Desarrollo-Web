use proyectoDW

db.createCollection('usuarios');
db.createCollection('planes');
//Estructura de la coleccion de usuarios

db.usuarios.insertMany(
    [
        {
        "_id":ObjectId(),
        "nombreRegistro":"usuarioPrueba",
        "apellidoRegistro":"Perez",
        "correoRegistro":"userprueba@gmail.com",
        "claveRegistro1":"24812",
        "carpetas":[
            {
                "_id":ObjectId(),
                "nombreCarpeta":"carpeta de prueba",
                "descripcion":"carpeta 1",
                "proyectos":[
                    {
                        "_id":ObjectId(),
                        "nombre":"proyecto de prueba",
                        "descripcion":"proyecto de prueba java",
                        "codigoHtml":'',
                        "codigoCss":'',
                        "codigoJs":''
                    }
                ]

            }
        ],
        "snippets":[
            {
                _id: ObjectId(),
                "nombreSnippet":"prueba de snipet",
                "descripcion":"crear un snipet",
                "lenguaje":"lenguaje de prueba",
                "codigo":"fgj"
            }
        ],
        "plan":ObjectId(),
        "nCarpetas":"3",
        "nProyectos":"3",
        "nSnippets":"3"
        }
    ]);

//Estructura de la coleccion de planes

db.planes.insertMany([{
    "_id":ObjectId(),
	"nombrePlan":"Plan Gratis",
	"precio":0,
	"numeroCarpetas":3,
	"numeroProyectos":3,
	"numeroSnippets":3
},
{
	"nombrePlan":"Plan Socio",
	"precio":39.99,
	"numeroCarpetas":20,
	"numeroProyectos":20,
	"numeroSnippets":"ilimitado"
},
{
	"nombrePlan":"Plan Premium",
	"precio":99.99,
	"numeroCarpetas":70,
	"numeroProyectos":70,
	"numeroSnippets":70
}])

