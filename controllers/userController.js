const express = require('express')
const userSchema = require('../models/userModel')
const bcrypt = require('bcryptjs')

const signUp = async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body;
    let hash = bcrypt.genSaltSync(10)
    console.log("Hash:",hash)
    let hashedPassword = bcrypt.hashSync(password,hash)
    const user = new userSchema({
        name,
        email,
        password:hashedPassword
    })
    let userData = await user.save()

    console.log('text')
    console.log(userData)
    return res.redirect('/login')
    
}

const login = async (req, res) => {
    const { email, password } = req.body;
    let userData = await userSchema.findOne({email});
    if(userData){
        if(bcrypt.compareSync(password,userData.password)){
           
            return res.render('data.ejs',userData)
        }else{
            res.status(400).json({
                status: false,
                message: "password is incorrect"
            })
        }
    }else{
        res.status(400).json({
            status: false,
            message: "user not found please signup first"
        })
    }
}



module.exports = { signUp, login }
