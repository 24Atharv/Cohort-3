import express = require('express');
import mongoose from 'mongoose';
import { User } from './schema';
const app = express();
app.use(express.json());

async function main() {
    // @ts-ignore
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000, () => console.log('server start'));
}

main();

