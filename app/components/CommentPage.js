import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class CommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: 'input',
      comments: this.props.comments,
      articleUrl: this.props.article.url,
      user: this.props.user,
    };
    this.backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
    };
    this.modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30,
      zIndex: 9000,
    };
    this.commentChange = this.commentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEnterKeypress = this.onEnterKeypress.bind(this);
  }

  // saves all the comments to database
  onSubmit() {
    const { commentInput, articleUrl, user } = this.state;
    axios.post('/saveComment', { commentInput, articleUrl, user }).then(() => {});
  }

  onEnterKeypress(event) {
    event.preventDefault();
    this.onSubmit();
  }

  commentChange(event) {
    this.setState({ commentInput: event.target.value });
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop" style={this.backdropStyle}>
        <div className="commentPage" style={this.modalStyle}>
          <h2>Comments</h2>
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
          <form onSubmit={this.onEnterKeypress}>
            <div className="enterComment">
              <input onChange={this.commentChange} type="text" />
            </div>
            <div className="submitCommentBtn">
              <input type="button" onClick={this.onSubmit} value="Submit Comment" />
            </div>
          </form>
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
  user: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(Object).isRequired,
};

export default CommentPage;
