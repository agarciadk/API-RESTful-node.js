'use strict'

function getIndex (req, res) {
  console.log('Get /login')
  res.render('login', { title: 'Entra' })
}

function signIn (req, res) {
  // TODO: Comprobar si el usuario existe en la base de datos
  console.log(`Usuario: ${req.body.username}
    Constraseña: ${req.body.password}`)
  if (req.body.username === 'admin' && req.body.password === '1234') {
    res.status(302).redirect('/api')
  } else { res.status(403).message('Sin atorización.') }
}

module.exports = {
  getIndex,
  signIn
}
