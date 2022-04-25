import express from 'express';
import { deleteUser, login, signNickNameCheck, signup, signupEmailCheck } from '../Controller/userController';

const router = express.Router();

// 닉네임 중복체크
router.post('/signup/nickNameCheck', signNickNameCheck);
// 아이디 중복검사
router.post('/signup/emailCheck', signupEmailCheck);
// 회원가입
router.post('/signup', signup);
// 로그인
router.post('/login', login);

router.post('/delete',deleteUser)

export default router;
