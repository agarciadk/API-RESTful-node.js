'use strict'

// Modelos
const Product = require('../models/product')
const fs = require('fs')

function getIndex (req, res) {
  res.render('index', { title: 'Panel de control' })
}

function getProduct (req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})

    if (!product) return res.status(404).send({message: 'El producto no existe.'})

    res.status(200).send({ product })
  })
}

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})

    if (!products) return res.status(404).send({message: 'No existen productos.'})

    res.status(200).send({ products })
  })
}
function saveProduct (req, res) {
  // Almacenar en la base de datos
  let product = new Product()
  product.name = req.body.name
  product.price = req.body.price
  product.category = req.body.category
  product.picture = req.file.filename
  product.description = req.body.description

  product.save((err, productStore) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(302).redirect('/api')
  })
}
function updateProduct (req, res) {
  // Almacenar en la base de datos
  let productId = req.params.productId
  let update = req.body
  Object.keys(update).forEach(key => {
    if (update[key] === '') {
      delete update[key]
    }
  })
  // Si se actualiza la imagen, se tiene que borrar del servidor la antigua
  if (req.file !== undefined) {
    update['picture'] = req.file.filename
    Product.findById(productId, (err, product) => {
      if (err) res.status(404).send({message: 'Producto no encontrado.'})
      let imageToDelete = product.picture
      fs.unlink(`./public/images/${imageToDelete}`, (err) => {
        if (err) res.status(500).send({message: `Error al borrar la imagen: ${err}`})

        console.log(`Imagen ${imageToDelete} borrada con exito`)
      })
    })
  }
  console.log(`update: ${JSON.stringify(update)}`)
  Product.findByIdAndUpdate(productId, update, (err, productUpdate) => {
    if (err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

    res.status(200).send({ productUpdate })
  })
}

function deleteProduct (req, res) {
  let productId = req.params.productId
  Product.findById(productId, (err, product) => {
    if (err) res.status(404).send({message: 'Producto no encontrado.'})
    let imageToDelete = product.picture
    fs.unlink(`./public/images/${imageToDelete}`, (err) => {
      if (err) res.status(500).send({message: `Error al borrar la imagen: ${err}`})

      console.log(`Imagen ${imageToDelete} borrada con exito`)
    })
    product.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})

      res.status(200).send({message: 'El producto ha sido eliminado'})
    })
  })
}

module.exports = {
  getIndex,
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
