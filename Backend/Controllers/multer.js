
 //import multer
const multer=require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, (file.originalname)) //Appending extension
  }
})
var upload = multer({ storage: storage }).single('image');



module.exports={upload}

// //import cloudinary
// const cloudinary=require('cloudinary').v2;

// //import multer
// const multer=require('multer')

// //import multer-storage-cloudinary
// const { CloudinaryStorage }=require('multer-storage-cloudinary')

// //configure cloudinary

// // Configuration 
// cloudinary.config({
//    cloud_name: "dgjsuikto",
//    api_key: "129796368188119",
//    api_secret: "aCB6iofKW1Olj2fYwIrYnlrd4hw"
//  });

  
// //configure cloudinary storage
// const cloudStorage=new CloudinaryStorage({
//    cloudinary:cloudinary,
//    params:async (req,file)=>{
//       return {
//          folder:'HMS',
//          public_id:file.fieldname+' '+Date.now()
      
//       }
//    }
// })

// //configure multer
// const multerObj=multer({storage:cloudStorage})


// module.exports=multerObj;