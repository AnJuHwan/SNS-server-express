"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const commentSchema = new Schema({
    postId: String,
    userId: String,
    comentDescription: String,
}, { timestamps: true, collection: 'comments' });
const Comment = mongoose_1.default.model('Comment', commentSchema);
exports.default = Comment;
