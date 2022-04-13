import express from 'express';
import { getDetailPost, getPost, uploadPost } from '../Controller/postController';

const router = express.Router();

// 모든 포스트 가져오기
router.get('/', getPost);

// 특정 상세 포스트 가져오기
router.get('/:id', getDetailPost);

// 포스트 업로드
router.post('/upload', uploadPost);

router.put('/:id', (req, res) => {
  res.status(201).send('PUT: /posts');
});

router.delete('/:id', (req, res) => {
  res.status(201).send('DELETE: /posts');
});

export default router;
