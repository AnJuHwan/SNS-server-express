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
const commentRouter_1 = __importDefault(require("./router/commentRouter"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
mongoose_1.default.connect(`${process.env.MONGODB_URI}`)
    .then(() => {
    const server = app.listen(port);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
        },
    });
    console.log('mongoDB connect!!');
    io.on('connection', (socket) => {
        socket.emit('test', { message: 'hello!' });
        console.log('연결되었습니다.!');
    });
})
    .catch((error) => console.log(error));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*', credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use('/post', postRouter_1.default);
app.use('/users', userRouter_1.default);
app.use('/comment', commentRouter_1.default);
app.use(express_1.default.static('public')); // public폴더 안에있는 모든 리소스를 가져갈 수 있음
app.get('/', (req, res) => {
    return res.status(200).json({ message: '서버연결!' });
});
// app.get('*', (req, res) => {
//   res.status(404).json({ message: '찾을 수 없는 페이지입니다!' });
// });
