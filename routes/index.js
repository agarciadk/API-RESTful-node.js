'use strict'

const express = require('express')

const index = express.Router()

index.get('/', (req, res) => {
  res.status(200).send('Hello World!!!')
})

module.exports = index
