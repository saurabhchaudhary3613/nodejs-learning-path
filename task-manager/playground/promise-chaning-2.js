require('../src/db/mongoose')

const Task = require('../src/models/task')

Task.findByIdAndDelete('5d403d5fde5f5f0aac02c26b').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})