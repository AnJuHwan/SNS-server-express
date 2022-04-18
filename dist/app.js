"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postRouter_1 = __importDefault(require("./router/postRouter"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
mongoose_1.default.connect(`${process.env.MONGODB_URI}`)
    .then(() => {
    app.listen(port);
    console.log('mongoDB connect!!');
})
    .catch((error) => console.log(error));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: ['*'] }));
app.use((0, cookie_parser_1.default)());
app.use('/post', postRouter_1.default);
app.use('/users', userRouter_1.default);
app.use(express_1.default.static('public')); // public폴더 안에있는 모든 리소스를 가져갈 수 있음
app.get('/getCookie', (req, res) => {
    res.cookie('cookie', 'test11').status(200).json({ postData: [] });
});
app.get('/checkCookie', (req, res) => {
    console.log(req.cookies);
    console.log(req.headers.cookie);
    res.status(200).json({ postData: [] });
});
app.get('*', (req, res) => {
    res.status(404).send('찾을 수 없는 페이지입니다!');
});
