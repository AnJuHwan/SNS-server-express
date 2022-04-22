import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: String,
    title: String,
    content: String,
    postNum: Number,
  },
  { timestamps: true, collection: 'posts' },
);

const Post = mongoose.model('Post', postSchema);

export default Post;
