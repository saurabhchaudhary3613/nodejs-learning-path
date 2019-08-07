const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/user')

const dummyUserId = new mongoose.Types.ObjectId
const dummyUser = {
    _id: dummyUserId,
    name: 'dummy',
    email: 'dummy@dummy.com',
    password: 'dummy@123',
    tokens: [{
        token: jwt.sign({ _id: dummyUserId}, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(dummyUser).save()
})

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Saurabh',
        email: 'Saurabh@example.com',
        password: 'MyPass777!'
    }).expect(201)

    // Assert that the database is changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertion about the response
    // expect(response.body).toMatchObject({
    //     token: user.tokens[0].token,
    //     user: {
    //         email: 'Saurabh@example.com',
    //         name: 'Saurabh',
    //     }
    // })

    expect(user.password).not.toBe('MyPass777!')
})

test('should login existing user', async () =>{
    const response = await request(app).post('/users/login').send({
        email: dummyUser.email,
        password: dummyUser.password
    }).expect(200)

    const user = await User.findById(dummyUserId)
    expect(response.body.token).toBe(user.tokens[1].token)
})
test('should not login non existing user', async () =>{
    await request(app).post('/users/login').send({
        email: dummyUser.email,
        password: 'wqwqw@1231212'
    }).expect(404)
})

test('should get profile for user', async () =>{
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${dummyUser.tokens[0].token}`)
        .send()
        .expect(200)
})


test('should not get profile for unauthenticated user', async () =>{
    await request(app).get('/users/me')
        .send()
        .expect(401)
})

test('should delete account for user', async () =>{
    const response = await request(app).delete('/users/me')
    .set('Authorization', `Bearer ${dummyUser.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(dummyUserId)
    expect(user).toBeNull()
})

test('should not delete account for unauthenticated user', async () =>{
    await request(app).delete('/users/me')
    .send()
    .expect(401)
})

// test('Should upload avatar image', async () => {
//     await request(app)
//         .post('/users/me/avatar')
//         .set('Authorization', `Bearer ${dummyUser.tokens[0].token}`)
//         .attach('avatar', 'tests/fixtures/profile-pic.jpg')
//         .expect(200)
//     const user = await User.findById(dummyUserId)
//     expect(user.avatar).toEqual(expect.any(Buffer))
// })

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${dummyUser.tokens[0].token}`)
        .send({
            name: 'Jess'
        })
        .expect(200)
    const user = await User.findById(dummyUserId)
    expect(user.name).toEqual('Jess')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${dummyUser.tokens[0].token}`)
        .send({
            location: 'Philadelphia'
        })
        .expect(404)
})