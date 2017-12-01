const newComment = require('./db.js').newComment;

const saveComment = (commentObj) => {
  const comment = commentObj.comment;
  const name = commentObj.name;
  const author = commentObj.author;

  const newComment = new Comment({});

  newComment.save();
};
