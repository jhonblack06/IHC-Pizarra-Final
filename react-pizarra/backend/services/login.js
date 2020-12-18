const MongoLib = require('../lib/mongo')
const { ObjectId } = require('mongodb')
const UsersServices = require('../services/users.js')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const config = require('../config')

class LoginServices {
  constructor() {
    this.collection = 'users'
    this.mongoDB = new MongoLib()
    this.usersServices = new UsersServices()
  }

  async login({ user, pass }) {
    user = user ? user.trim() : ''
    pass = pass ? pass.trim() : ''
    
    const query = {user: user, pass: pass}

    const userData = await this.mongoDB.getOne(this.collection, query)

    if(!userData) {
      throw new Error('not_found')
    }

    const token = jwt.sign({ id: userData._id }, config.SECRET, {})
    return {
      id: userData._id,
      name: userData.name,
      token: token
    }
  }

  async createUser({ user, pass, name }) {
    name = name ? name.trim() : ''
    user = user ? user.trim() : ''
    pass = pass ? pass.trim() : ''

    const token = await this.usersServices.createUser({ user, pass, name })

    return token
  }

  async validate({ user, code, fcm }) {

    const query = {_id: ObjectId(user), code: code}

    const userData = await this.mongoDB.getOne(this.collection, query)

    if(!userData) {
      throw new Error('Autorization_error')
    }

    if(fcm) {
      const data = {
        fcmToken: fcm
      }
      const update = await this.mongoDB.updateOne(this.collection, userData._id, data)

      if(!update) {
        throw new Error('update_fcm_error')
      }

      return {
        name: userData.name
      }
    }else{
      return {
        name: userData.name
      }
    }
  }
}

module.exports = LoginServices
