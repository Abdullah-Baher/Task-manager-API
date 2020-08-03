const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Task-manager'
const id = new ObjectID()

console.log(id.id)
console.log(id.toHexString())

MongoClient.connect(connectionURL,{useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error)
    {
        return console.log('Unable to connect to the database')
    }
    
    const db = client.db(databaseName)
    /*db.collection('users').find({
        age:21
    }).toArray((error,data) => console.log(data))
    db.collection('users').findOne({age:21},(error,user) => console.log(user))
   */
    db.collection('users').updateMany({},{
        $set:{
            age:21
        }
    }).then((data) => console.log(data))
    .catch((error) => console.log(error))
     
})