import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    password: String,
    profile: String,
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

const User = mongoose.model('User', userSchema);

export default User;
