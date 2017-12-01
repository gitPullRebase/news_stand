import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

class CommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: 'input',
      comments: [],
      articleUrl: this.props.article.url,
      user: this.props.user,
    };
  }

  // gets all the comments from database
  componentDidMount() {
    axios({
      url: '/comments',
      method: 'post',
      data: { article: this.state.article },
    }).then((returnedComments) => {
      this.setState({ comments: returnedComments });
    });
  }

  //saves all the comments to database
  onSubmit() {
    axios({
      method: 'post',
      url: '/saveComment',
      data: {
        comment: this.state.commentInput,
        url: this.state.articleUrl,
        author: this.state.user,
      },
    }).then(() => {});
  }

  commentChange(event) {
    this.setState({ commentInput: event.target.value });
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="commentPage">
        <div className="closeBtn">
          <input onClick={this.props.onClose} type="button" value="close" />
        </div>
        <div className="commentList">
          {this.state.comments.map(comment => (
            <div className="comment">
              <div className="comment-author">{this.state.user}</div>
              <div className="comment-text">{comment.comment}</div>
            </div>
          ))}
        </div>
        <div className="enterComment">
          <input onChange={this.commentChange} type="text" />
        </div>
        <div className="submitCommentBtn">
          <input type="button" onClick={this.onSubmit} value="Submit Comment" />
        </div>
      </div>
    );
  }
}

CommentPage.propTypes = {
  article: PropTypes.shape({
    urlToImage: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    source: PropTypes.shape({
      name: PropTypes.string,
    }),
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string),
    selectedSources: PropTypes.arrayOf(PropTypes.object),
    profileImg: PropTypes.string,
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentPage;
