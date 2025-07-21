"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usermiddleware_1 = require("./usermiddleware");
const JWT_PASSWORD = process.env.JWT_PASSWORD;
const app = express();
app.use(express.json());
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield schema_1.User.create({
        username: username,
        password: password
    });
    if (user) {
        res.status(200).json({
            message: "signed in"
        });
    }
    else {
        res.status(500).json({
            message: "Server error"
        });
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield schema_1.User.findOne({
        username: username,
        password: password
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, 
        // @ts-ignore
        JWT_PASSWORD);
        res.status(200).json({
            token
        });
    }
    else {
        res.status(500).json({
            message: "Internal sever error"
        });
    }
}));
app.post('/api/v1/content', usermiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    yield schema_1.Content.create({
        link,
        title,
        type,
        // @ts-ignore
        userId: req.userId,
        tags: []
    });
    return res.status(200).json({
        message: "Content created"
    });
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        yield mongoose_1.default.connect(process.env.MONGO_URL);
        app.listen(3000, () => console.log('server start'));
    });
}
main();
