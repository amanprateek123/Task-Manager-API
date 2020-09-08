const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express()
//middleware
app.use((req,res,next)=>{
    console.log(req.method,req.path)
    next()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app