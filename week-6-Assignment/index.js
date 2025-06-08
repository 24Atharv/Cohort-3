const express = require('express');
const app = express();

const users = [];

app.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    users.push({
        username,
        password
    });

    res.json({
        "Signup Done"
    })

})

app.listen(4000);

