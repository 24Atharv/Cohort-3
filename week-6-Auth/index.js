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
   for (let i = 0; i < users.length; i++) {
      if (users[i].username === username && users[i].password === password) {
         foundUser = users[i];
      }
   }
   if (foundUser) {
      const token = jwt.sign({
         username: username
      }, JWT_SECRET);

      res.json({
         token: token
      })

   } else {
      res.json({
         message: "Invalid"
      })
   }
   console.log(users);
});



app.get('/me', (req, res) => {
   const token = req.headers.token

   const decodedToekenInfo = jwt.verify(token, JWT_SECRET);

   if (decodedToekenInfo.username) {
      res.json({
         username: decodedToekenInfo.username
      })
   }
   else {
      res.status(403).json({
         message: "Invalid"
      })
   }
})

app.listen(4000, () => console.log("Server Started"));
