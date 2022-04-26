import { Request, Response } from 'express';
import Comment from '../Model/commentModel';

// 댓글 가져오기
export const getComment = (req: Request, res: Response) => {
  Comment.findOne({ postId: req.query })
    .exec()
    .then((item) => {
      res.status(200).json({
        success: true,
        comment: item,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: 'server error',
      });
    });
};

// 댓글 쓰기
export const createComment = (req: Request, res: Response) => {};
