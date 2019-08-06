const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const dummyUser = {
    name: 'dummy',
    email: 'dummy@dummy.com',
    password: 'dummy@123'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(dummyUser).save()
})

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Saurabh',
        email: 'Saurabh@example.com',
        password: 'MyPass777!'
    }).expect(201)
})

test('should login existing user', async () =>{
    await request(app).post('/users/login').send({
        email: dummyUser.email,
        password: dummyUser.password
    }).expect(200)
})
test('should not login non existing user', async () =>{
    await request(app).post('/users/login').send({
        email: dummyUser.email,
        password: 'wqwqw@1231212'
    }).expect(404)
})