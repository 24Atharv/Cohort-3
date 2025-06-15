const express = require('express');
const adminRoute = express.Router();
const { adminMiddleware } = require('../middlewares/admin');
const { adminModel } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require('../config');

adminRoute.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    const admin = await adminModel.create({
        email, password, firstName, lastName,
    });

    if (admin) {
        res.json({
            message: "signup succeded"
        })
    } else {
        res.status(403).json({
            message: "Incorrect creadentials"
        })
    }
})

adminRoute.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email,
        password
    })

    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);
        res.json({
            token
        })
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
})

module.exports = {
    adminRoute
}
