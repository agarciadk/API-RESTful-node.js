'use strict'

const services = require('../services')

/* Como es un middleware se necesita el parametro next, para enviarlo
* al siguiente controlador
*/
function isAuth (req, res, next) {
  /* Comprobamos si en la cabecera de la peticion hay un campo
  * llamado authorization
  */
  if (!req.headers.authorization) {
    // Si no existe enviamos un error 403 de No autorizado
    return res.status(403).send({message: 'No tienes autorización.'})
  } else { // En el caso de que si exista esta cabecera
    const token = req.headers.authorization.split(' ')[1]

    services.decodeToken(token)
      .then(response => {
        req.user = response
        next()
      })
      .catch(response => {
        res.status(response.status)
      })
  }
}

module.exports = isAuth
