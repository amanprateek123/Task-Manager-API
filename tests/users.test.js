const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/users')
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

beforeEach(async ()=>{
      await User.deleteMany()
      await new User(userOne).save()
})


test('new user sign-up',async ()=>{
    await request(app).post('/users').send({
        name: 'Aman',
        email:'amanpra333@gmail.com',
        password:'MyPass77'
    }).expect(201)
})

test('User login',async ()=>{
    const response = await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login non existing ones',async ()=>{
    await request(app).post('/users/login').send({
        email:'amanpra333@gmail.com',
        password:userOne.password
    }).expect(404)
})

test('user authentication',async ()=>{
    await request(app).delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})