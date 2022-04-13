"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const counterSchema = new Schema({
    name: String,
    postNum: Number,
}, { collection: 'counter' });
const Counter = mongoose_1.default.model('counter', counterSchema);
exports.default = Counter;
