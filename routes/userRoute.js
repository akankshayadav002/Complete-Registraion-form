const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler.js');
const { homePage, signUp, login, loginPage, profile, logout, forgetPage, forget } = require('../controllers/userController')
const User = require('../models/userModel')

router.get('/', errorHandler(homePage));
router.get('/login', errorHandler(loginPage));
router.post("/signup", errorHandler(signUp))
router.post("/login", errorHandler(login))

router.get('/profile', errorHandler(profile));
router.get('/logout', errorHandler(logout));
router.get('/forget', errorHandler(forgetPage));
router.post('/forget', errorHandler(forget));



module.exports = router
