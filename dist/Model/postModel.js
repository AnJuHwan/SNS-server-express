"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const postSchema = new Schema({
    title: String,
    content: String,
    postNum: Number,
}, { timestamps: true, collection: 'posts' });
const Post = mongoose_1.default.model('Post', postSchema);
exports.default = Post;
