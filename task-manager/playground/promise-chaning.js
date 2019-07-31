require('../src/db/mongoose')

const User = require('../src/models/user')

User.findByIdAndUpdate('5d403a252bdbc07ed8ea28e5', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})