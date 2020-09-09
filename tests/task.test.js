const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/users')
const Task = require('../src/models/tasks')
const {taskOne,userOne,setUpData}= require('./fixtures/db')

beforeEach(setUpData)

test('get Task',async()=>{
    await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(201)
    // expect(response.body.length).toEqual(1)
})