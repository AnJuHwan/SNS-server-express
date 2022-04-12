"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = __importDefault(require("./router/post"));
const user_1 = __importDefault(require("./router/user"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
mongoose_1.default.connect(`${process.env.MONGODB_URI}`)
    .then(() => console.log('mongoDB connect!!'))
    .catch((error) => console.log(error));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: ['*'] }));
app.use('/posts', post_1.default);
app.use('/users', user_1.default);
app.use(express_1.default.static('public')); // public폴더 안에있는 모든 리소스를 가져갈 수 있음
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
app.listen(port);
