const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

// Create a new task using post
router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(error) {
        res.status(400).send(error)
    } 
})

// Read/fetch all tasks from database
router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})

// Read/fetch specific task by id from database
router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
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
router.delete('/tasks/:id', async (req, res) => {

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

module.exports = router
