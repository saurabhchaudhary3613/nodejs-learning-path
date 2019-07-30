const mongoose = require('mongoose')
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-magager-api', { 
        useNewUrlParser: true ,
        useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Please provide a valid email !')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be positive');
            }
        }
    }
})

const me = new User({
    name: '   Saurabh  ',
    email: ' MYEMAIL@GMAIL.com'
})

me.save().then((user) => {
    console.log(user)
}).catch((error) => {
    console.log(error)
})

// const Tasks = mongoose.model('Tasks', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// })

// const myTask = new Tasks({
//     description: 'node course',
//     completed: false
// })

// myTask.save().then((task) => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })