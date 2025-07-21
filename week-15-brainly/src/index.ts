import dotenv from 'dotenv';
dotenv.config();
import express = require('express');
import mongoose from 'mongoose';
import { User } from './schema';
import { json } from 'zod';
import jwt from 'jsonwebtoken';
const JWT_PASSWORD = process.env.JWT_PASSWORD;
const app = express();
app.use(express.json());

app.post('/api/v1/signup', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.create({
        username: username,
        password: password
    });

    if (user) {
        res.status(200).json({
            message: "signed in"
        })
    }
    else {
        res.status(500).json({
            message: "Server error"
        })
    }

})

app.post('/api/v1/signin', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        username: username,
        password: password
    })

    if (user) {
        const token = jwt.sign({
            id: user._id
        },
            // @ts-ignore
            JWT_PASSWORD);
        res.status(200).json({
            token
        })
    } else{
        res.status(500).json({
            message: "Internal sever error"
        })
    }
})


async function main() {
    // @ts-ignore
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000, () => console.log('server start'));
}

main();

