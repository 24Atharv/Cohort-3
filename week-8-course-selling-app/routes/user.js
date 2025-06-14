const express = require('express');

const userRoute = express.Router();

userRoute.post('/signup', (req, res) => {
    res.json({
        message: "Signup Done"
    })
})

module.exports = {
    userRoute
}
