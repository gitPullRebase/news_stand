import Comment from '../database/models/comment';

const saveComments = (request, response, next) => {
  // query comments table in database and pass it back down
  console.log('request when saving is ', request.body);
  const commentObj = {
    time: request.body.time,
    comment: request.body.commentInput,
    url: request.body.articleUrl,
    author: request.body.user,
  };

  const newComment = new Comment(commentObj);
  newComment.save();

  next();
};

export default saveComments;
