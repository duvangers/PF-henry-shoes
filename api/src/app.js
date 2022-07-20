const express = require('express')
const logger = require('morgan')
const path = require('path')

const routes = require('./routes')

const app = express()

app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '../..', 'client', 'build')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')

  next()
})

app.use('/api', routes)

app.disable('etag')

module.exports = app
