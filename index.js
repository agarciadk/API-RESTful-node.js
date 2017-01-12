'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

// Empieza nuestra API
mongoose.connect(config.db, (err, res) => {
  if (err) return console.log(`Error al conectar a la base de datos: ${err}`)
  console.log('Conexión a la base de datos establecida...')

  app.listen(config.port, config.server_ip_address, () => {
    console.log(`API REST corriendo en ${config.server_ip_address}:${config.port}`)
  })
})
