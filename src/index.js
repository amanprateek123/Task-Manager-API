const app = require('./app')
const port = process.env.PORT
//testing
// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize: 1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){   //regular expressions
//             return cb(new Error("Image upload fails"))
//         }
//         cb(undefined,true)
//     }
// })

// app.post('/uploads',upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//      res.status(400).send({error:error.message})
// })



app.listen(port, ()=>{
    console.log("Server is up on port "+ port)
})