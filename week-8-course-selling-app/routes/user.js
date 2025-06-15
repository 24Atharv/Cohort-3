const express = require('express');

const userRoute = express.Router();

userRoute.post('/signup', (req, res) => {
    const { email, password, fistName, lastName} = req.body

    
})

module.exports = {
    userRoute
}
