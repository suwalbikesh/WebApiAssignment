var imageModel = require('../models/imageModel');
var multer=require ('multer');
// Multer storage options
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
var upload = multer({ storage: storage });
//for single image upload
var imageFile = upload.single('image')

function uploadImage(req,res,next){
    // console.log(req.file.filename);
    imageModel.img.create({
        image: req.file.filename
    })    
    .then(function(){
        next({status : 200,
            message : 'Upload successfull'})

    })
    .catch(function(err){
        console.log(err);
        next(err);
    })
}

//for multipule image upload

var imageFiles = upload.fields([
                {name:'image',maxCount:1},
                {name:'image2',maxCount:1},
                {name:'image3',maxCount:1},
                {name:'image4',maxCount:1}
                ]);
// var imageFiles = upload.array('image',4);
function uploadMuliImage(req,res,next){
    // console.log(req.files.image);
    const data = req.files;
    var count = 1;
   
    
    for(count = 1; count<=Object.keys(data).length; count++){
        if (count === 1){
            var array = req.files.image
        }
        else if(count === 2){
            var array = req.files.image2
        }
        else if(count === 3){
            var array = req.files.image3
        }
        else if(count === 4){
            var array = req.files.image4
        }

        array.forEach(element => {
            console.log(element.filename); 
            imageModel.img.create({
                image: element.filename
            })    
            .then(function(){
                next({status : 200,
                    message : 'Upload successful'})
        
            })
            .catch(function(err){
                console.log(err);
                next(err);
            })       
        });
        // console.log(count);
    }




}

module.exports = {
    uploadImage,
    imageFile,
    imageFiles,
    uploadMuliImage
}