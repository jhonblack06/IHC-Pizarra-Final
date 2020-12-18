const jwt = require('jsonwebtoken')
const UsersServices = require('../../services/users')
const config = require('../../config')

const usersServices = new UsersServices()

async function jwtValidate(req, res, next) {
  //req.token = {user: '5f0646226e76213088b8a5d2', code: 1594246709}
  //next()
  try {
    var token = req.headers.authorization.split(' ')[1]
    //var token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, config.SECRET, async function(error, decoded) {
      if (error) {
        return res.json({ msg: 'error', data: 'Autorization_error' })
      }else{
        req.token = decoded
        next()
      }
    })
  }catch(e) {
    return res.status(403).json({msg: 'error', data: 'Autorization_required' })
  }
}

module.exports = jwtValidate
