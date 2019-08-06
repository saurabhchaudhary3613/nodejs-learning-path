const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, { 
        useNewUrlParser: true ,
        useCreateIndex: true,
        useFindAndModify: false
})

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



// const myTask = new Tasks({
//     description: '  my     description!!    '
// })

// myTask.save().then((task) => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })