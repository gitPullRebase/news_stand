import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

const comments = mongoose.Schema({
  comment: { type: String },
  url: { type: String },
  author: { type: String },
});

const Comment = mongoose.model('Comment', comments);

db.on('error', (error) => {
  console.log('connection error : ', error);
});

db.once('open', () => {
  console.log('connection to mongoDb open');
});

module.exports.Comment = Comment;
export default db;
