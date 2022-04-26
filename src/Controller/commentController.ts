import { NextFunction, Request, Response } from 'express';
import Comment from '../Model/commentModel';
import Post from '../Model/postModel';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
io.on('connection', (socket) => {
  console.log('Socket client conneted');
});

// 댓글 가져오기
export const getComment = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query.postId);
  Post.findOne({ _id: req.query.postId })
    .exec()
    .then((item) => {
      if (!item) {
        return res.status(400).json({ success: false, message: '게시물이 존재하지 않습니다.' });
      } else {
        Comment.findOne({ postId: req.query.postId })
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

// 댓글 쓰기
export const createComment = (req: Request, res: Response) => {
  let temp = {
    postId: req.body.postId,
    userId: req.body.userId,
    comentDescription: req.body.comentDescription,
  };

  const NewComment = new Comment(temp);

  NewComment.save()
    .then(() => {
      res.status(200).json({ success: true, comment: NewComment });
    })
    .catch((err: any) => {
      res.status(400).json({ success: false, message: 'server Error' });
    });
};
