const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
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
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(404).send()
    }
})

// Logout router

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [] 
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

//Reading/fetching all users
router.get('/users', auth, async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch(error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// Read/fetch specific user
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//        const user =  await User.findById(_id)
//         if(!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch(e) {
//         res.status(500).send()
//     }
// })

//update exiting resource/user using patch
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowupdates = ['email', 'name', 'age', 'password']
    const isvalidOperation = updates.every((update) => {
        return allowupdates.includes(update)
    })

    if(!isvalidOperation) {
        return res.status(404).send({'error': 'Not a valid update!'})
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
    }
})

// Delete a resource/user by Id

router.delete('/users/me', auth, async (req, res) => {

    try {
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
         res.send(req.user)
    } catch(e) {
        res.status(500).send(e)
    }
    
})

// upload/delete file/profile pic

const avatar = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error ('Please upload a image'))
        }
        cb(undefined, true)
    }
})

router.post('/user/me/avatar', auth, avatar.single('avatar'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer

    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/user/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch(e) {
        res.status(404).send()
    }
})

module.exports = router