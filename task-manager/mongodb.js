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
    db.collection('users').insertOne({
        _id: id,
        name: 'Vikram',
        age: 35
    }, (error, result) => {
        if(error) {
            return console.log('Unable to insert user')
        }
        console.log(result.ops)
    })  

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
})