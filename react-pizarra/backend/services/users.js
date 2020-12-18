const MongoLib = require('../lib/mongo')
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const config = require('../config')

class UsersServices {
  constructor() {
    this.collection = 'users'
    this.mongoDB = new MongoLib()
  }

  async createUser({ user, pass, name }) {
    name = name ? name.trim() : ''
    user = user ? user.trim() : ''
    pass = pass ? pass.trim() : ''

    const data = {name: name, user: user, pass: pass}

    const userCreate = await this.mongoDB.insertOne(this.collection, data)

    if(!userCreate) {
      throw new Error('not_inserted')
    }

    console.log(userCreate);

    const token = jwt.sign({ id: userCreate.insertedId }, config.SECRET, {})

    return {
      id: userCreate.insertedId,
      name: name,
      token: token
    }
  }
}

module.exports = UsersServices
