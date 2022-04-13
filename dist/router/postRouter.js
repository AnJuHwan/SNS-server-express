"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../Controller/postController");
const router = express_1.default.Router();
// 모든 포스트 가져오기
router.get('/', postController_1.getPost);
// 특정 상세 포스트 가져오기
router.get('/:id', postController_1.getDetailPost);
// 포스트 업로드
router.post('/upload', postController_1.uploadPost);
router.put('/:id', (req, res) => {
    res.status(201).send('PUT: /posts');
});
router.delete('/:id', (req, res) => {
    res.status(201).send('DELETE: /posts');
});
exports.default = router;
