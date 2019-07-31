const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(error) {
        res.status(400).send(error)
    }
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((error) => {
    //     res.status(400)
    //     res.send(error)
    // })
})


//Reading/fetching all users
app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch(error) {
        res.status(500).send()
    }

    // User.find({}).then((users) =>{
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// Read/fetch specific user
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
       const user =  await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
    // User.findById(_id).then((user) => {
    //     if(!user) {
    //        return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

//update exiting resource/user using patch
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowupdates = ['email', 'name', 'age', 'password']
    const isvalidOperation = updates.every((update) => {
        return allowupdates.includes(update)
    })

    if(!isvalidOperation) {
        return res.status(404).send({'error': 'Not a valid update!'})
    }

    try {
        const _id = req.params.id
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        console.log(user)

        if(!user) {
           return  res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

// Delete a resource/user by Id

app.delete('/users/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).send()
        }
         res.send(user)
    } catch(e) {
        res.status(500).send(e)
    }
    
})

// Create a new task using post
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(error) {
        res.status(400).send(error)
    } 
})

// Read/fetch all tasks from database
app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})

// Read/fetch specific task by id from database
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send()
        }
        res.status(404).send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

// Update a task using patch

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowupdates = ['description', 'completed']
    const isvalidOperation = updates.every((update) => {
        return allowupdates.includes(update)
    })

    if(!isvalidOperation) {
        return res.status(404).send({'error': 'Not a valid update!'})
    }

    try {
        const _id = req.params.id
        const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!task) {
           return  res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

//Delete task by Id
app.delete('/tasks/:id', async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task) {
            return res.status(404).send()
        }
         res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }
    
})

app.listen(port, () => {
    console.log('Server is up on ' + port)
})