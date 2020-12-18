const jwt = require('jsonwebtoken')
const UsersServices = require('../../services/users')
const config = require('../../config')

const usersServices = new UsersServices()

async function jwtValidateSocket(token, next) {
  //req.token = {user: '5f0646226e76213088b8a5d2', code: 1594246709}
  //next()
  try {
    jwt.verify(token, config.secret, async function(error, decoded) {
      if (error) {
        console.log(error);
        return res.json({ msg: 'error', data: 'Autorization_error' })
      }else{
        req.token = decoded
        const {user, code} = decoded
        const token = await usersServices.validate({user, code})
        if(token) {
          next()
        }else{
          return res.json({ msg: 'error', data: 'Autorization_error' })
        }
      }
    })
  }catch(e) {
    return res.status(403).json({msg: 'error', data: 'Autorization_required' })
  }
}

module.exports = jwtValidateSocket
