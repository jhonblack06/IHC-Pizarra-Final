const express = require('express')
const LoginServices = require('../services/login.js')
//const jwtHandlers = require('../utils/middlewares/jwtHandlers')

function loginApi(app) {
  const router = express.Router()
  app.use('/login', router)

  const loginServices = new LoginServices()

  router.post('/', async (req, res, next) => {
    const { user, pass } = req.body
    try {
      const data = await loginServices.login({ user, pass })

      res.status(200).json({
        msg: 'ok',
        data: data
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/create', async (req, res, next) => {
    //const id = req.token.user
    const { user, pass, name } = req.body
    try {
      const data = await loginServices.createUser({ user, pass, name })

      res.status(200).json({
        msg: 'ok',
        data: data
      })
    } catch (error) {
      next(error)
    }
  })

  router.get('/validate', async (req, res, next) => {
    const { user, code } = req.token
    const { fcm } = req.query
    try {
      const data = await loginServices.validate({ user, code, fcm })
      res.status(200).json({
        msg: 'ok',
        data: data
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = loginApi
