"use strict"
var express = require('express');
var bodyParser = require('body-parser');
var imageController = require('./controllers/imageController');
var app = express();
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUI = require('swagger-ui-express');

var swaggerDefinition = {
    info: {
        title : 'webAPIAssignment',
        version : '0.0.1',
        description : 'this is webAPI assignment'
    },

    securityDefinitions:{
        bearerAuth: {
            type: 'apiKey',
            name:'authorization',
            scheme:'bearer',
            in: 'header'
        }
    },
    host : 'localhost:3050',
    basePath:'/'
}

var swaggerOptions = {
    swaggerDefinition,
    apis:['./index.js']
}

var swaggerSepcs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerSepcs));

app.use(bodyParser.urlencoded({extended:true}));
//api-documentation
//for single image upload
/**
* @swagger
* /image:
*  post:
*   tags:
*    - Image
*   description: This is for single image upload
*   produces:
*    - applicaiton/json
*   consumes:
*    - application/form-data
*   parameters:
*    - name: image
*      in: formData
*      type: file
*      required: true
*      description: select image
*   responses:
*    200:
*     description: Upload successfully
*    404:
*     description: error
*/

//for multiple image upload
/**
* @swagger
* /images/multipule:
*  post:
*   tags:
*    - Image
*   description: This is for multiple image upload
*   produces:
*    - applicaiton/json
*   consumes:
*    - application/form-data
*   parameters:
*    - name: image
*      in: formData
*      type: file
*      required: true
*      description: select image
*    - name: image2
*      in: formData
*      type: file
*      required: true
*      description: select image
*    - name: image3
*      in: formData
*      type: file
*      required: true
*      description: select image
*    - name: image4
*      in: formData
*      type: file
*      required: true
*      description: select image
*   responses:
*    200:
*     description: Upload successfully
*    404:
*     description: error
*/

app.post('/image',imageController.imageFile,imageController.uploadImage);

app.post('/images/multipule',imageController.imageFiles,imageController.uploadMuliImage);

app.use('/*',function(req,res){
    res.status(404);
    res.send('NOT FOUND');
});

app.use(function(err,req,res,next){

    res.json({
        status:err.status,
        message: err.message

    })
    // res.send(err.message)
})
app.listen(3050);