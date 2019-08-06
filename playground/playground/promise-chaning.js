require('../src/db/mongoose')

const User = require('../src/models/user')

// Using Promise
// User.findByIdAndUpdate('5d403a252bdbc07ed8ea28e5', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

//Using async await
const updateAgeAndCount = async (id, age) => {

    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5d403a252bdbc07ed8ea28e5', 20).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e);
}) 