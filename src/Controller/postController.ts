import { Request, Response } from 'express';
import Counter from '../Model/counterModel';
import Post from '../Model/postModel';

// 모든 포스트 가져오기
export const getPost = (req: Request, res: Response) => {
  // if (req.query) {
  //   return Post.findOne({ _id: req.query.id })
  //     .exec()
  //     .then((item) => {
  //       res.status(200).json({ success: true, postItem: item });
  //       console.log(item);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       res.status(200).json({ success: false, message: 'server error' });
  //     });
  // }
  Post.find()
    .exec()
    .then((item) => {
      res.status(200).json({
        success: true,
        postItem: item,
      });
    })
    .catch((error) => res.status(400).json({ success: false, message: 'server error' }));
};

// 특정 상세 포스트 가져오기
export const getDetailPost = (req: Request, res: Response) => {
  Post.findOne({ _id: req.params.id })
    .exec()
    .then((item) => {
      res.status(200).json({ success: true, postItem: item });
    })
    .catch((error) => {
      console.log(error);
      res.status(200).json({ success: false, message: 'server error' });
    });
};

// 포스트 업로드
export const uploadPost = (req: Request, res: Response) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    postNum: 0,
  };

  Counter.findOne({ name: 'counter' })
    .exec()
    .then((counterInfo) => {
      temp.postNum = counterInfo.postNum;
      const NewPost = new Post(temp);
      NewPost.save().then(() => {
        Counter.findOneAndUpdate({ name: 'counter' }, { $inc: { postNum: 1 } })
          .exec()
          .then(() => {
            res.status(200).json({ success: true, postItem: NewPost });
          });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false, message: 'server error' });
    });
};
