'use strict'

const express = require('express')
const loginCtrl = require('../controllers/login')

const login = express.Router()

login.get('/', loginCtrl.getIndex)
login.post('/signIn', loginCtrl.signIn)
/* La dirección resultante seria /login/logout */
// login.post('/logout', loginCtrl.logout)

module.exports = login
