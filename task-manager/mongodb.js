// CRUD - create, read, update and delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectId = mongodb.ObjectID


const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaes = 'task-manager'

// const id = new ObjectID()
// console.log(id);
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        console.log('Unable to connect database! ', error)
    }

    const db = client.db(databaes)

    //insert one document
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Vikram',
    //     age: 35
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })  

    // inset more than documents 

    // db.collection('users').insertMany([
    //     {name: 'SA', age: 30},
    //     {name: 'GA', age: 31},
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert docs')
    //     }

    //     console.log(result.ops)
    // })

    // Insert three tasks inside 'tasks' collection with description string and with boolean value T/F - 'completed/incomplete'

    // db.collection('tasks').insertMany([
    //     {description: 'Task1', completed: true},
    //     {description: 'Task2', completed: false},
    //     {description: 'Task3', completed: false}
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert task')
    //     }
    //     console.log(result.ops)
    // })
    // 
    // db.collection('users').findOne({name: 'GA', age:11}, (error, user) => {
    //     if(error) {
    //         console.log('Unable to fine user')
    //     }
    //     console.log(user)
    // })

    //Find single document in database 'findOne'
    // db.collection('users').findOne({_id: ObjectID('5d3c2c5e17bedffd205eeba9')}, (error, user) => {
    //     if(error) {
    //         console.log('Unable to fine user')
    //     }
    //     console.log(user)
    // })

    // Find multiple documents in database -> 'find'

    // db.collection('users').find({ age: 31 }).toArray((error, user) => {
    //     if(error) {
    //         console.log(error);
    //     }
    //     console.log(user);
    // })
    // db.collection('users').find({ age: 31 }).count((error, count) => {
    //     if(error) {
    //         console.log(error);
    //     }
    //     console.log(count);
    // })

    // 1. Exercise - Use findone on tasks collection  and fins a document usig id
    // 2. use find to fetach all the tasks that are not completed - prind docs to console

    // db.collection('tasks').findOne({_id: ObjectID('5d3c09a384acc71f21c27bdd')}, (error, task) => {
    //     if(error) {
    //         return console.log('Unable to fetch task')
    //     }
    //     console.log(task)
    // })
    // db.collection('tasks').find({completed: false}).toArray((error, incompleteTask)=> {
    //     if(error) {
    //         return console.log('unable to find task')
    //     }
    //     console.log(incompleteTask)
    // })

    // CRUD - create, read, update and delete

    // update one

   db.collection('users').updateOne({
        _id: ObjectID('5d3c0170ca2f9e39d0f535eb')
    }, {
        $set: {
            name: 'Nakul'
        }
        // ,
        // $inc: {
        //     age: 1 // increment age by 1
        // }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })

    // update many - update all the tasks as completed

    // db.collection('tasks').updateMany(
    //     { completed : true },
    //     { $set: { completed : false }}
    // ).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    //Delete many
    // db.collection('users').deleteMany(
    //     {age: 30}
    // ).then( result => console.log(result) )
    // .catch(error => console.log(error))

    db.collection('tasks').deleteOne(
        {description: 'Task3'}
    ).then( result => console.log(result) )
    .catch(error => console.log(error))
})