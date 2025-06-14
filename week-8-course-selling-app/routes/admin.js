const express = require('express');
const adminRoute = express.Router();

adminRoute.post('/signup', (req, res) => {
    res.json({
        message: 'Signup done'
    })
})

module.exports = {
    adminRoute
}
