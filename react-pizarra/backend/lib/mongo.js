const { MongoClient, ObjectId } = require('mongodb')
const config = require('../config')

/*const USER = encodeURIComponent(config.dbUser)
const PASS = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = (USER && PASS) ?
`mongodb://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${DB_NAME}`
:
`mongodb://${config.dbHost}:${config.dbPort}/${DB_NAME}`*/

const MONGO_URI = `mongodb://127.0.0.1:27017/PizaRobot`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true })
    this.dbName = 'PizaRobot'
  }

  connect() {
    if(!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(error => {
          if(error) {
            reject(error)
          }
          console.log('Conectado a MongoDB');
          resolve(this.client.db(this.dbName))
        })
      })
    }
    return MongoLib.connection
  }

  getAll(collection) {
    return this.connect().then(MongoDB => {
      return MongoDB.collection(collection).find().toArray()
    })
  }

  getMany(collection, query, sort, page, max) {
    return this.connect().then(MongoDB => {
      return MongoDB.collection(collection).find(query).sort(sort).skip((page - 1) * max).limit(max).toArray()
    })
  }

  getOne(collection, query) {
    return this.connect().then(MongoDB => {
      return MongoDB.collection(collection).findOne(query)
    })
  }

  insertOne(collection, data) {
    return this.connect().then(MongoDB => {
      return MongoDB.collection(collection).insertOne(data)
    })
  }

  updateOne(collection, id, data) {
    return this.connect().then(MongoDB => {
      return MongoDB.collection(collection).updateOne({'_id': ObjectId(id)}, {$set: data})
    })
  }

  deleteOne(collection, id) {
    return this.connect().then(MongoDB => {
      return MongoDB.collection(collection).deleteOne({'_id': ObjectId(id)})
    })
  }

  /*db.collection(collection).find(
    query
  ).skip((page - 1) * max).limit(max).sort({nombres: 1, apellidos: 1}).toArray()*/
}

module.exports = MongoLib
