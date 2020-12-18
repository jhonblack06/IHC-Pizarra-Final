const jwt = require('jsonwebtoken')
const UsersServices = require('../../services/users')
const config = require('../../config')

const usersServices = new UsersServices()

function jwtHandler(req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1]
    //var token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, config.secret, async function(error, decoded) {
      if (error) {
        return res.json({ msg: 'error', data: 'Autorization_error' })
      }else{
        req.token = decoded
        const {user, code} = decoded
        next()
      }
    })
  }catch(e) {
    return res.status(403).json({msg: 'error', data: 'Autorization_required' })
  }
}

module.exports = jwtHandler
