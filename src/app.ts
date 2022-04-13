import express, { NextFunction, Request, Response } from 'express';
import postRouter from './router/postRouter';
import userRouter from './router/userRouter';
import cors from 'cors';
import dotenv from 'dotenv';
import Mongoose from 'mongoose';
import Post from './Model/postModel';
import Counter from './Model/counterModel';

dotenv.config();

const app = express();
const port = 5000;

Mongoose.connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    app.listen(port);
    console.log('mongoDB connect!!');
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors({ origin: ['*'] }));

app.use('/post', postRouter);
app.use('/users', userRouter);
app.use(express.static('public')); // public폴더 안에있는 모든 리소스를 가져갈 수 있음

// app.post('/', (req: Request, res: Response, next: NextFunction) => {
//   console.log(req.body);
//   res.status(200).json({ success: true });
// });

// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(error);
//   res.status(500).json({ messgae: 'Server Error...' });
// });

app.get('*', (req, res) => {
  res.status(404).send('찾을 수 없는 페이지입니다!');
});