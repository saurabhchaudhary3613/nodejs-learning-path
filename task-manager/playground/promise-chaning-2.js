require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndDelete('5d403d5fde5f5f0aac02c26b').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// using async await
const deleteAndCounttask = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false})

    return count
}

deleteAndCounttask('5d4079ea98fa180349eb1b5f').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})