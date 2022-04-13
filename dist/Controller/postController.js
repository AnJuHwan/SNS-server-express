"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.uploadPost = exports.getDetailPost = exports.getPost = void 0;
const counterModel_1 = __importDefault(require("../Model/counterModel"));
const postModel_1 = __importDefault(require("../Model/postModel"));
// 모든 포스트 가져오기
const getPost = (req, res) => {
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
    postModel_1.default.find()
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
exports.getPost = getPost;
// 특정 상세 포스트 가져오기
const getDetailPost = (req, res) => {
    postModel_1.default.findOne({ _id: req.params.id })
        .exec()
        .then((item) => {
        res.status(200).json({ success: true, postItem: item });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
};
exports.getDetailPost = getDetailPost;
// 포스트 업로드
const uploadPost = (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content,
        postNum: 0,
    };
    counterModel_1.default.findOne({ name: 'counter' })
        .exec()
        .then((counterInfo) => {
        temp.postNum = counterInfo.postNum;
        const NewPost = new postModel_1.default(temp);
        NewPost.save().then(() => {
            counterModel_1.default.findOneAndUpdate({ name: 'counter' }, { $inc: { postNum: 1 } })
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
exports.uploadPost = uploadPost;
// 포스트 수정하기
const editPost = (req, res) => {
    postModel_1.default.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            title: req.body.title,
            content: req.body.content,
        },
    }, { new: true })
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
exports.editPost = editPost;
// 포스트 삭제하기
const deletePost = (req, res) => {
    postModel_1.default.findOneAndDelete({ _id: req.params.id })
        .exec()
        .then((item) => {
        res.status(200).json({ success: true, postItem: item });
    })
        .catch((error) => {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    });
};
exports.deletePost = deletePost;
