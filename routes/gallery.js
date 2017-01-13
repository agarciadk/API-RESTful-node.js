'use strict'

const express = require('express')
const galleryCtrl = require('../controllers/gallery')

const gallery = express.Router()

gallery.get('/', galleryCtrl.getIndex)

module.exports = gallery
