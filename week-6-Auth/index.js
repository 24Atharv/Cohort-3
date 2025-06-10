const express = require('express');
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'randomatharvzzxatg'

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

   console.log(users);

})

app.post('/signin', (req, res) => {
   const username = req.body.username
   const password = req.body.password

   let foundUser = null;
   for(let i=0; i < users.length; i++) {
      if(users[i].username === username && users[i].password === password) {
         foundUser = users[i];
      } 
   }
      if(!foundUser) {
         res.json({
            message: "Invalid"
         });
   } else {
      res.json({
         message: "Signin succesfull"
      })
   }
   console.log(users);
})

app.listen(4000, () => console.log("Server Started"));
