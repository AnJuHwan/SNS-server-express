"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../Controller/commentController");
const router = express_1.default.Router();
// 댓글 가져오기
router.get('/', commentController_1.getComment);
// 댓글 쓰기
router.post('/create', commentController_1.createComment);
exports.default = router;
