"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.getComment = void 0;
const commentModel_1 = __importDefault(require("../Model/commentModel"));
const postModel_1 = __importDefault(require("../Model/postModel"));
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (socket) => {
    console.log('Socket client conneted');
});
// 댓글 가져오기
const getComment = (req, res, next) => {
    console.log(req.query.postId);
    postModel_1.default.findOne({ _id: req.query.postId })
        .exec()
        .then((item) => {
        if (!item) {
            return res.status(400).json({ success: false, message: '게시물이 존재하지 않습니다.' });
        }
        else {
            commentModel_1.default.findOne({ postId: req.query.postId })
                .exec()
                .then((item) => {
                res.status(200).json({
                    success: true,
                    comment: item,
                });
            });
        }
    })
        .catch((error) => {
        res.status(500).json({
            success: false,
            message: 'server error',
        });
    });
};
exports.getComment = getComment;
// 댓글 쓰기
const createComment = (req, res) => {
    let temp = {
        postId: req.body.postId,
        userId: req.body.userId,
        comentDescription: req.body.comentDescription,
    };
    const NewComment = new commentModel_1.default(temp);
    NewComment.save()
        .then(() => {
        res.status(200).json({ success: true, comment: NewComment });
    })
        .catch((err) => {
        res.status(400).json({ success: false, message: 'server Error' });
    });
};
exports.createComment = createComment;
