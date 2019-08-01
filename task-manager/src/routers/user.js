const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users', async (req, res) => {
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

router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(404).send()
    }
})

//Reading/fetching all users
router.get('/users', async (req, res) => {

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
router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowupdates = ['email', 'name', 'age', 'password']
    const isvalidOperation = updates.every((update) => {
        return allowupdates.includes(update)
    })

    if(!isvalidOperation) {
        return res.status(404).send({'error': 'Not a valid update!'})
    }

    try {
        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })

        await user.save()

        if(!user) {
           return  res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

// Delete a resource/user by Id

router.delete('/users/:id', async (req, res) => {

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

module.exports = router