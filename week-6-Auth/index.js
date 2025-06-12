const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));


const jwt = require('jsonwebtoken');
const JWT_SECRET = 'randomatharvzzxatg'

const users = [];

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/public/index.html')
});

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



// app.get('/me', (req, res) => {
//    const token = req.headers.token

//    const decodedToekenInfo = jwt.verify(token, JWT_SECRET);

//    if (decodedToekenInfo.username) {
//       res.json({
//          username: decodedToekenInfo.username
//       })
//    }
//    else {
//       res.status(403).json({
//          message: "Invalid"
//       })
//    }
// })


app.get('/me', (req, res) => {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing or malformed" });
   }

   const token = authHeader.split(" ")[1];

   try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.json({ username: decoded.username });
   } catch (err) {
      res.status(403).json({ message: "Invalid token" });
   }
});



app.listen(4000, () => console.log("Server Started"));
