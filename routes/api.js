'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const upload = require('../middlewares/multer')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/', productCtrl.getIndex)
api.get('/product', auth, productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', auth, upload.single('archivo'), productCtrl.saveProduct)
api.put('/product/:productId', auth, upload.single('archivo'), productCtrl.updateProduct)
api.delete('/product/:productId', auth, productCtrl.deleteProduct)
api.get('/login', (req, res) => { res.render('login', { title: 'Entra' }) })
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, function (req, res) {
  res.status(200).send({message: 'Tienes acceso'})
})

module.exports = api
