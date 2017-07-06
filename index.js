'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

// Empieza nuestra API
mongoose.connect(config.db, {useMongoClient: true}, (err, res) => {
  if (err) return console.log(`Error al conectar a la base de datos: ${err}`)
  console.log('Conexión a la base de datos establecida...')

  app.listen(config.port, function () {
    console.log('Node app is running on port', config.port)
  })
})
