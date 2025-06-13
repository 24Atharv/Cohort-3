const express = require('express');
const app = express();
app.use(express.json());
const { UserModel, TodoModel } = require('./db');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const JWT_SECRET = 'randomencodergen';

mongoose.connect('mongodb+srv://atharvwork:1224@cluster0.xsevoja.mongodb.net/atharvdatabase');

// Middleware to authenticate JWT
function auth(req, res, next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
}

// Signup Route
app.post('/signup', async (req, res) => {
    const requireBody = z.object({
        email: z.string(),
        password: z.string(),
        name: z.string()
    });

    const result = requireBody.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Incorrect Format" });
    }

    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await UserModel.create({
        email,
        password: hashedPassword,
        name
    });

    res.json({ message: "Signup Completed" });
});

// Signin Route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token });
});

// Create Todo
app.post('/todos', auth, async (req, res) => {
    const { title, done } = req.body;
    await TodoModel.create({ title, done, userId: req.userId });
    res.json({ message: "Todo Created" });
});

// Get current user's ID from token
app.get('/todo', auth, (req, res) => {
    res.json({ id: req.userId });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
