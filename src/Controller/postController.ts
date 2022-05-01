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
    .sort({ updatedAt: -1 })
    .exec()
    .then((item) => {
      res.status(200).json({
        success: true,
        postItem: item,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
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
      res.status(500).json({ success: false, message: 'server error' });
    });
};

// 포스트 업로드
export const uploadPost = (req: Request, res: Response) => {
  let temp = {
    userId: req.body.userId,
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
      res.status(500).json({ success: false, message: 'server error' });
    });
};

// 포스트 수정하기
export const editPost = (req: Request, res: Response) => {
  Post.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
      },
    },
    { new: true },
  )
    .exec()
    .then((item) => {
      res.status(200).json({ success: true, postItem: item });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });

  /*
  Post.findOneAndUpdate({ _id: req.body.id })
    .exec()
    .then((item) => {
      item.title = req.body.title;
      item.content = req.body.content;
      console.log('item: ' + item);
      item.save().then(() => {
        res.status(200).json({ success: true, postItem: item });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
  */
};

// 포스트 삭제하기
export const deletePost = (req: Request, res: Response) => {
  Post.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((item) => {
      res.status(200).json({ success: true, postItem: item });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ success: false, message: 'server error' });
    });
};
