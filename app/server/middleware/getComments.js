
const getComments = (request, response, next) => {
  //query comments table in database and pass it back down

  request.comments = []
  next();
};

export default getComments;
