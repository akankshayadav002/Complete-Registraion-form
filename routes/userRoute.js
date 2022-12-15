const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler.js');
const { signUp, login } = require('../controllers/userController')
const User=require('../models/userModel')

router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});
router.get('/login', function (req, res, next) {
	console.log("in login")
	return res.render('login.ejs');
});
router.post("/signup", errorHandler(signUp))
router.post("/login", errorHandler(login))


router.get('/logout', function (req, res, next) {
	return res.redirect('/')
	
});

router.get('/forget', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forget', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});


module.exports = router
