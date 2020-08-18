const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT

//middleware
app.use((req,res,next)=>{
    console.log(req.method,req.path)
    next()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

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