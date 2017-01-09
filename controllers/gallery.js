'use strict'

function getIndex (req, res) {
  console.log('Get /gallery')
  res.render('gallery', { title: 'Galeria de productos' })
}

module.exports = { getIndex }
