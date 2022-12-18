const express = require('express')
const userSchema = require('../models/userModel')
const bcrypt = require('bcryptjs')


const homePage = function (req, res, next) {
    return res.render('index.ejs');
}
const signUp = async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body;
    let hash = bcrypt.genSaltSync(10)
    console.log("Hash:", hash)
    let hashedPassword = bcrypt.hashSync(password, hash)
    const user = new userSchema({
        name,
        email,
        password: hashedPassword
    })
    let userData = await user.save()

    console.log('text')
    console.log(userData)
    return res.redirect('/login')

}
const loginPage = function (req, res, next) {
    console.log("in login")
    return res.render('login.ejs');
}

const login = async (req, res) => {
    const { email, password } = req.body;
    let userData = await userSchema.findOne({ email });
    if (userData) {
        if (bcrypt.compareSync(password, userData.password)) {

            return res.render('data.ejs', userData)
        } else {
            res.status(400).json({
                status: false,
                message: "password is incorrect"
            })
        }
    } else {
        res.status(400).json({
            status: false,
            message: "user not found please signup first"
        })
    }
}

const profile = function (req, res, next) {
    console.log("profile");
    User.findOne({ email: req.session.email }, function (err, data) {
        console.log("data");
        console.log(data);
        if (!data) {
            res.redirect('/');
        } else {

            return res.render('data.ejs', { "name": data.name, "email": data.email });
        }
    });
}

const logout = function (req, res, next) {
    return res.redirect('/')

}

const forgetPage = function (req, res, next) {
    res.render("forget.ejs");
}

const forget = function (req, res, next) {

    User.findOne({ email: req.body.email }, function (err, data) {
        console.log(data);
        if (!data) {
            res.send({ "Success": "This Email Is not regestered!" });
        } else {

            if (req.body.password == req.body.passwordConf) {
                data.password = req.body.password;
                data.passwordConf = req.body.passwordConf;

                data.save(function (err, Person) {
                    if (err)
                        console.log(err);
                    else
                        console.log('Success');
                    res.send({ "Success": "Password changed!" });
                });
            } else {
                res.send({ "Success": "Password does not matched! Both Password should be same." });
            }
        }
    });

}

module.exports = { homePage, signUp, login, loginPage, profile, logout, forgetPage, forget }
