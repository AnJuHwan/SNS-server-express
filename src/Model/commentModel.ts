import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    postId: String,
    userId: String,
    comentDescription: String,
  },
  { timestamps: true, collection: 'comments' },
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
