import Comment from '../database/models/comment';

const getComments = (request, response, next) => {
  // query comments table in database and pass it back down
  const article = request.body.url;

  Comment.find({ url: article }, (err, doc) => {}).then((comments) => {
    request.comments = comments;
    next();
  });
};

export default getComments;
