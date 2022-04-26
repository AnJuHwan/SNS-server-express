import express, { NextFunction, Request, Response } from 'express';
import postRouter from './router/postRouter';
import userRouter from './router/userRouter';
import cors from 'cors';
import dotenv from 'dotenv';
import Mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import Post from './Model/postModel';
import Counter from './Model/counterModel';
import comentRouter from './router/commentRouter';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

Mongoose.connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    app.listen(port);
    console.log('mongoDB connect!!');
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser());

app.use('/post', postRouter);
app.use('/users', userRouter);
app.use('/comment', comentRouter);
app.use(express.static('public')); // public폴더 안에있는 모든 리소스를 가져갈 수 있음

// app.get('/getCookie', (req: Request, res: Response) => {
//   res.cookie('cookie', 'test11').status(200).json({ postData: [] });
// });
// app.get('/checkCookie', (req: Request, res: Response) => {
//   console.log(req.cookies);
//   console.log(req.headers.cookie);
//   res.status(200).json({ postData: [] });
// });

// app.get('*', (req, res) => {
//   res.status(404).json({ message: '찾을 수 없는 페이지입니다!' });
// });
