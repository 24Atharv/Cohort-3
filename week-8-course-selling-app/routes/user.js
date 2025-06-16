const express = require('express');
const userRoute = express.Router();
const { userModel } = require('../db'); 
const { JWT_USER_PASSWORD } = require('../config');
const jwt = require('jsonwebtoken');

userRoute.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    const user = await userModel.create({
        email, password, firstName, lastName
    })

    if(user) {
        res.json({
            message: 'signup succeded'
        })
    } else {
        res.status(403).json({
            message: 'Invalid credentials'
        })
    }
})

userRoute.post('/signin', async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({
        email,
        password
    }) 

    if(user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);
        res.json({
            token
        })
    } else {
        res.json({
            message: "Invalid credentials"
        });
    }
})

module.exports = {
    userRoute
}

