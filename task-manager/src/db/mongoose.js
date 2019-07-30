const mongoose = require('mongoose')
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-magager-api', { 
        useNewUrlParser: true ,
        useCreateIndex: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if(value.toLowerCase().includes('password')) {
//                 throw new Error ('Password should not contain password')
//             }
//         }
//     },
//     email: {
//         type: String,
//         require: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if(!validator.isEmail(value)) {
//                 throw new Error('Please provide a valid email !')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if(value < 0) {
//                 throw new Error('Age must be positive');
//             }
//         }
//     }
// })

// const me = new User({
//     name: '   Max  ',
//     email: ' MYEMAIL@GMAIL.com',
//     password: '   acc1234   '
// })

// me.save().then((user) => {
//     console.log(user)
// }).catch((error) => {
//     console.log(error)
// })

const Tasks = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const myTask = new Tasks({
    description: '  my     description!!    '
})

myTask.save().then((task) => {
    console.log(task)
}).catch((error) => {
    console.log(error)
})