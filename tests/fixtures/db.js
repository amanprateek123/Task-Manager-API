const request = require('supertest')
const app = require('../../src/app')
const User = require('../../src/models/users')
const Task = require('../../src/models/tasks')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id:userOneId,
    name:'Rishu',
    email:'rishu123@gmail.com',
    password:'Mypass678',
    tokens:[{
        token:jwt.sign({_id:userOneId},process.env.JWT)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id:userTwoId,
    name:'Laddu',
    email:'vatan983@gmail.com',
    password:'Mypass0978',
    tokens:[{
        token:jwt.sign({_id:userTwoId},process.env.JWT)
    }]
}

const taskOne = {
   _id:new mongoose.Types.ObjectId(),
   description:'I am a boy',
   completed:true,
   owner:userOneId
}

const setUpData = async()=>{
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
}

module.exports={
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    setUpData
}