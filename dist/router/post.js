"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(201).send('GET: /posts');
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
