import Comment from '../database/models/comment';

const getComments = (request, response, next) => {
  // query comments table in database and pass it back down
  const article = request.data.article.url;

  Comment.find({ url: article }, (err, doc) => {}).then((comments) => {
    console.log('returned comments from database is ', comments);
    // request.comments = comments;
  });

  next();
};

export default getComments;
