'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
  name: String,
  picture: String,
  price: { type: Number, default: 0 },
  category: { type: String, enum: ['computers', 'phones', 'accesories'] },
  description: String
})

/*
 * De esta manera decimos que el esquema ProductSchema es accesible
 * desde el resto de la aplicación, siempre que lo importemos
 */
module.exports = mongoose.model('Product', ProductSchema)
