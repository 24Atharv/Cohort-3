const express = require('express');
const { mongoose } = require('mongoose');
const app = express();
app.use(express.json());
const { userRoute } = require('./routes/user');
const { courseRoute } = require('./routes/course');
const { adminRoute } = require('./routes/admin');
const db = require('./db');


function main() {
    mongoose.connect('mongodb+srv://atharvwork:1224@cluster0.xsevoja.mongodb.net/coursera');
    app.listen(3000);
    console.log("Server Started");
}
main();

app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/course', courseRoute);


