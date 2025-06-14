const express = require('express');
const { mongoose } = require('mongoose');
const app = express();
app.use(express.json());
const { userRoute } = require('./routes/user');

function main() {
    mongoose.connect('mongodb+srv://atharvwork:1224@cluster0.xsevoja.mongodb.net/coursera');
    app.listen(3000);
    console.log("Server Started");
}
main();

app.use('/user', userRoute);


