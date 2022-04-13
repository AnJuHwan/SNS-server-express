import mongoose from 'mongoose';

const { Schema } = mongoose;

const counterSchema = new Schema(
  {
    name: String,
    postNum: Number,
  },
  { collection: 'counter' },
);

const Counter = mongoose.model('counter', counterSchema);

export default Counter;
