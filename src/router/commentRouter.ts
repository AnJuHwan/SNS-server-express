import express from 'express';
import { createComment, getComment } from '../Controller/commentController';

const router = express.Router();

// 댓글 가져오기
router.get('/', getComment);

// 댓글 쓰기
router.post('/create', createComment);

export default router;
