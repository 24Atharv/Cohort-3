const express = require('express');
const app = express();
app.use(express.json());

const { UserModel, TodoModel } = require('./db');
const { default: mongoose } = require('mongoose');

mongoose.connect('mongodb+srv://atharvwork:1224@cluster0.xsevoja.mongodb.net/atharvdatabase');


app.post('/signup',async (req, res) => {
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

app.post('/signin',(req, res) => {

})

app.post('/todos',(req, res) => {

})

app.post('/todo',(req, res) => {

});

function auth(req, res, next) {

}


app.listen(3000);

