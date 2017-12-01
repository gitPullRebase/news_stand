import Comment from '../database/models/comment';

const saveComments = (request, response, next) => {
  // query comments table in database and pass it back down
  console.log('request sent from comment page is ', request);
  const commentObj = {
    comment: request.data.comment,
    url: request.data.url,
    author: request.data.author,
  };

  const newComment = new Comment(commentObj);
  newComment.save();

  next();
};

export default saveComments;
