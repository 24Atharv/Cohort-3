require('dotenv').config();
const express = require('express');
const { mongoose } = require('mongoose');
const app = express();
app.use(express.json());
const { adminRoute } = require('./routes/admin')
const { courseRoute} = require('./routes/course')
const { userRoute } = require('./routes/user')
const db = require('./db');


function main() {
    mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("Server Started");
}
main();

app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/course', courseRoute);


