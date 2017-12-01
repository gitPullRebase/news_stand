import User from '../database/models/user'; 
import Article from '../database/models/article';

const removeArticle = (request, response, next) => { 
	if (request.user) {
		console.log("description: ", request.body.title)
		User.update({'username': request.user.username},{$pull: { articles: {title: request.body.title }}})
		.exec()
		.then((doc)=>{ 
			console.log(doc);
		})
		.catch((err)=>{ 
			console.log("error removing dislikes from database.", err);
		})
	}
	next()

}
export default removeArticle


