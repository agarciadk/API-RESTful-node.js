'use strict'

const express = require('express')

const index = express.Router()

index.get('/', (req, res) => {
  res.status(302).redirect('/login')
})

module.exports = index
