'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const upload = require('../middlewares/multer')
// const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/', productCtrl.getIndex)
api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', upload.single('archivo'), productCtrl.saveProduct)
api.put('/product/:productId', upload.single('archivo'), productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)
/*
api.get('/private', auth.isAuth, function (req, res) {
  res.status(200).send({message: 'Tienes acceso'})
})
*/
module.exports = api
