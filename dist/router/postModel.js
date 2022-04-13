"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const counter_1 = __importDefault(require("../Model/counter"));
const post_1 = __importDefault(require("../Model/post"));
const router = express_1.default.Router();
router.post('/upload', (req, res) => {
    let temp = {
        id: '',
        title: req.body.title,
        content: req.body.content,
        postNum: 0,
    };
    counter_1.default.findOne({ name: 'counter' })
        .then((counterInfo) => {
        temp.postNum = counterInfo.postNum;
        const NewPost = new post_1.default(temp);
        NewPost.save().then(() => {
            counter_1.default.findOneAndUpdate({ name: 'counter' }, { $inc: { postNum: 1 } }).then(() => {
                res.status(200).json({ success: true, postItem: NewPost });
            });
        });
    })
        .catch((error) => {
        console.log(error);
        res.status(400).json({ success: false, message: 'server error' });
    });
});
router.post('/', (req, res) => {
    res.status(201).send('POST: /posts');
});
router.put('/:id', (req, res) => {
    res.status(201).send('PUT: /posts');
});
router.delete('/:id', (req, res) => {
    res.status(201).send('DELETE: /posts');
});
exports.default = router;
