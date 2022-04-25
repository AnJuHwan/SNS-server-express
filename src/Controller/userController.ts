import { NextFunction, Request, Response } from 'express';
import User from '../Model/userModel';
import bcrypt from 'bcrypt';

export const allUser = (req: Request, res: Response) => {
  User.find()
    .exec()
    .then((item) => {
      res.status(200).json({ success: true, user: item });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'server Error' });
    });
};

export const signNickNameCheck = (req: Request, res: Response) => {
  User.findOne({ nickName: req.body.nickName })
    .exec()
    .then((item) => {
      if (item) {
        return res.status(400).json({ success: false, messgae: '이미 존재하는 닉네임 입니다.' });
      }
      res.status(200).json({ succes: true, message: '사용 가능한 닉네임 입니다.' });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: 'server Error' });
      console.log(error);
    });
};

export const signupEmailCheck = (req: Request, res: Response) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((item) => {
      if (item) {
        return res.status(400).json({ success: false, messgae: '이미 존재하는 이메일 입니다.' });
      }
      res.status(200).json({ succes: true, message: '사용 가능한 이메일 입니다.' });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: 'server Error' });
      console.log(error);
    });
};

export const signup = async (req: Request, res: Response) => {
  const hashed = await bcrypt.hash(req.body.password, 12);
  let temp = {
    email: req.body.email,
    password: hashed,
    nickName: req.body.nickName,
    profile: req.body.profile,
  };
  const userSignup = new User(temp);
  userSignup
    .save()
    .then(() => {
      res.status(200).json({ success: true, user: userSignup });
    })
    .catch((error: any) => {
      console.log(error);
      res.status(400).json({ success: false, message: 'server error' });
    });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((item) => {
      if (!item) {
        return res.status(401).json({ success: false, message: '이메일을 확인해주세요.' });
      } else {
        bcrypt.compare(req.body.password, item.password).then(function (result) {
          if (!result) {
            return res.status(401).json({ success: false, message: '비밀번호를 확인해주세요.' });
          }
          res.status(200).json({ success: true, user: item });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, message: 'server Error' });
    });
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  User.findOneAndDelete({ _id: req.body.id })
    .exec()
    .then((item) => {
      if (!item) {
        return res
          .status(400)
          .json({ success: false, message: '가입되어있지 않은 아이디 입니다..' });
      } else {
        return res.status(200).json({ success: true, user: item });
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: '탈퇴 실패하였습니다.', err });
    });
};

/* 
 bcrypt.compare(req.body.password, item.password).then(function (result) {
        if (!result) {
          return res
            .status(401)
            .json({ success: false, message: '아이디,비밀번호를 확인해주세요2.' });
        }
      });
*/
