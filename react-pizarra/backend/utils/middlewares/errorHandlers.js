const boom = require('@hapi/boom')
const config = require('../../config')

function withErrorStack(error, stack) {
  if(config.dev) {
    return { msg: 'error', error, stack }
  }

  return {msg: 'error', error}
}

function logErrors(error, req, res, next) {
  console.log(error)
  next(error)
}

function wrapErrors(error, req, res, next) {
  if(!error.isBoom) {
    next(boom.badImplementation(error))
  }
  next(error)
}

function errorHandler(error, req, res, next) {
  const {
    output: { statusCode, payload }
  } = error
  res.status(statusCode)
  res.json(withErrorStack(error.message, error.stack))
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
}
