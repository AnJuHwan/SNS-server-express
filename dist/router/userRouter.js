"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controller/userController");
const router = express_1.default.Router();
// 닉네임 중복체크
router.post('/signup/nickNameCheck', userController_1.signNickNameCheck);
// 아이디 중복검사
router.post('/signup/emailCheck', userController_1.signupEmailCheck);
// 회원가입
router.post('/signup', userController_1.signup);
// 로그인
router.post('/login', userController_1.login);
exports.default = router;
