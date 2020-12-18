const express = require('express')

function loginApi(app) {
  const router = express.Router()
  app.use('/validate', router)

  router.get('/', async (req, res, next) => {
    res.status(200).json({
      msg: 'ok',
      data: 'ok'
    })
  })
}

module.exports = loginApi
