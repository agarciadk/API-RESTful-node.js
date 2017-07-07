'use strict'
/**
* @controller user
* Este controlador se va a encargar de registros y
* autenticación de usuarios
*/

const User = require('../models/user')
const service = require('../services')

// Funciones controladoras
function getIndex (req, res) {
  res.render('login', { title: 'Entra' })
}
function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save((err) => {
    if (err) res.status(500).send({ message: `Error al crear el usuario: ${err}` })

    return res.status(201).send({ token: service.createToken(user) })
  })
}

function signIn (req, res) {
  let query = User.findOne({ email: req.fields.email }).select('_id email password')
  query.exec(function (err, user) {
    if (err) return res.status(401).send({ message: 'Usuario incorrecto' })
    if (!user) return res.status(401).send({ message: 'No existe el usuario' })
    // test a matching password
    user.comparePassword(req.fields.password, function (err, isMatch) {
      if (err) return res.status(401).send({ message: 'Contraseña incorrecta' })
    })
    req.user = user
    //res.render('index')
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })

  })
}

module.exports = {
  getIndex,
  signUp,
  signIn
}
