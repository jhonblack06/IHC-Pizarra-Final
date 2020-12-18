//const http = require('http');
const https = require('https')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')
const config = require('./config')
const socket = require('./lib/socket')

const jwtValidates = require('./utils/middlewares/jwtValidates')
const { logErrors, wrapErrors, errorHandler } = require('./utils/middlewares/errorHandlers')
const notFoundHandler = require('./utils/middlewares/notFoundHandler')

const app = express();

app.use(express.static(__dirname + '/../public'))
app.use(express.json())
app.use(cors())
app.use(morgan(':date[iso] --> [:remote-addr] :method :url :status :response-time ms - :res[content-length]'))

const api = express.Router()
api.use(jwtValidates)
app.use('/api', api)

const loginApi = require('./routes/login.js')
const validateApi = require('./routes/validate.js')

loginApi(app)

validateApi(api)

app.use(notFoundHandler)

app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

var server = https.createServer({
  key: fs.readFileSync('./private.key'),
  cert: fs.readFileSync('./certificate.crt')
}, app)
.listen(config.PORT, () => {
  socket(server)
  console.log(`Servidor montado en el puerto: ${config.PORT}`)
})
