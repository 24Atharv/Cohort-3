const express = require('express');
const app = express();
app.use(express.json());
const { UserModel, TodoModel } = require('./db');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'randomencodergen'

mongoose.connect('mongodb+srv://atharvwork:1224@cluster0.xsevoja.mongodb.net/atharvdatabase');

app.post('/signup', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    const user = await UserModel.create({
        email: email,
        password: password,
        name: name
    });

    res.json({
        message: "Signup Completed"
    })

    console.log(user);

})

app.post('/signin', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const foundUser = await UserModel.findOne({
        email: email,
        password: password
    })

    console.log(foundUser);

    if (foundUser) {
        const token = jwt.sign({
            id: foundUser._id
        }, JWT_SECRET);
        res.json({
            token: token
        })

    }
    else {
        res.json({
            message: "Invalid"
        })
    }
})

app.post('/todos', async (req, res) => {
    const title = req.body.title
    const done = req.body.done
    const userId = req.body._id

    const todo = await TodoModel.create({
        title: title,
        done: done,
        userId: userId
    });

    res.json({
        message: "todo make"
    })
})

app.get('/todo', (req, res) => {
    const token = req.headers.token

    const decodeToken = jwt.verify(token, JWT_SECRET);
    
    const id = decodeToken.id.toString();

    res.json({
        id
    })
});

function auth(req, res, next) {
    
}


app.listen(3000);

