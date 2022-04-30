import { allUser, myUser } from './../Controller/userController';
import express from 'express';
import {
  deleteUser,
  login,
  signNickNameCheck,
  signup,
  signupEmailCheck,
} from '../Controller/userController';

const router = express.Router();



// 가입되어있는 유저 모두 조회
router.get('/', allUser);
// 닉네임 중복체크
router.post('/signup/nickNameCheck', signNickNameCheck);
// 아이디 중복검사
router.post('/signup/emailCheck', signupEmailCheck);
// 회원가입
router.post('/signup', signup);
// 로그인
router.post('/login', login);
// 회원탈퇴
router.post('/delete', deleteUser);
// 내 유저 정보 불러오기
router.get('/my',myUser)

export default router;
