const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/users')
const Task = require('../src/models/tasks')
const {taskOne,userOne}= require('./fixtures/db')

test('get Task',async()=>{
    await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    // expect(response.body.length).toEqual(1)
})