const express = require('express');
const app = express();
app.use(express.json());


const users = [];

app.post('/signup', (req, res) => {
   const username = req.body.username
   const password = req.body.password 

   users.push({
    username, 
    password
   });

   res.json({
    message: "Signup is Done"
   });

})

app.post('/signin', (req, res) => {

})

app.listen(4000, () => console.log("Server Started"));
