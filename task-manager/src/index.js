const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if(req.method === 'GET') {
//         res.send('GET Request are disabled !')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on ' + port)
})

// const jwt = require('jsonwebtoken')

// const myFunc = async () => {
//     const token = jwt.sign({_id: 'abc123'}, 'thisismyapptoken', {expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'thisismyapptoken')
//     console.log(data)
// }
// myFunc()

const User = require('./models/user')
const Task = require('./models/task')

const main = async (req, res) => {
    // const task = await Task.findById('5d46a6ff91427e783c593b49')
    // await task.populate('owner').execPopulate()

    // console.log(task.owner)

    // const user = await User.findById('5d46a57b4cfaa60efc4ca135')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
}

main()