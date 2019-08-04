const express = require('express')
auth =  require('../middleware/auth')
const Task = require('../models/task')

const router = new express.Router()

// Create a new task using post
router.post('/tasks', auth, async (req, res) => {
    //const task = new Task(req.body)

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch(error) {
        res.status(400).send(error)
    } 
})

// Read/fetch all tasks from database
router.get('/tasks', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const tasks = await Task.find({})
         const tasks = await Task.findOne({owner: req.user._id})
        // await req.user.populate('tasks').execPopulate()
        res.send(tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})

// Read/fetch specific task by id from database
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task) {
            return res.status(404).send()
        }
        res.status(404).send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

// Update a task using patch

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowupdates = ['description', 'completed']
    const isvalidOperation = updates.every((update) => {
        return allowupdates.includes(update)
    })

    if(!isvalidOperation) {
        return res.status(404).send({'error': 'Not a valid update!'})
    }

    try {
        // const _id = req.params.id
        // const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        // const task = await Task.findByIdAndUpdate(req.params.id)
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        if(!task) {
            return  res.status(404).send()
         }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        
        
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

//Delete task by Id
router.delete('/tasks/:id', auth, async (req, res) => {

    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner:req.user._id});
        if(!task) {
            return res.status(404).send()
        }
         res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }
    
})

module.exports = router
