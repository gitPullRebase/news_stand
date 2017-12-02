import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';
import Dislike from 'material-ui-icons/HighlightOff';

class CommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: '',
      comments: this.props.comments,
      articleUrl: this.props.article.url,
      user: this.props.user,
      messageState: '',
    };
    this.backdropStyle = {
      position: 'absolute',
      top: -20,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 80,
      zIndex: 99,
    };
    this.modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 700,
      minHeight: 400,
      margin: '0 auto',
      padding: 30,
    };
    this.commentChange = this.commentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEnterKeypress = this.onEnterKeypress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ comments: nextProps.comments });
  }

  // saves all the comments to database
  onSubmit() {
    if (this.state.commentInput !== '') {
      const commentObj = {
        time: new Date(),
        commentInput: this.state.commentInput,
        articleUrl: this.state.articleUrl,
        user: this.state.user,
      };
      axios.post('/saveComment', commentObj).then(() => {
        this.setState({
          commentInput: '',
          messageState: 'message',
        });
      });
    } else {
      this.setState({ messageState: 'no message' });
    }
  }

  onEnterKeypress(event) {
    // event.preventDefault();
    this.onSubmit();
  }

  commentChange(event) {
    this.setState({ commentInput: event.target.value });
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    let message;
    if (this.state.messageState === 'message') {
      message = <p>Message has been posted!</p>;
    } else if (this.state.messageState === 'no message') {
      message = <p>Message field is empty!</p>;
    }
    return (
      <div className="backdrop" style={this.backdropStyle}>
        <div className="commentPage" style={this.modalStyle}>
          <Dislike className="closeButton" onClick={this.props.onClose} />
          <h2>{this.props.article.title}</h2>
          <br />
          <div className="commentList">
            {this.state.comments.map(comment => (
              <div className="comment">
                <div className="comment-author">
                  <strong>Comment by {comment.author}</strong>
                  <text> {moment(comment.time).fromNow()}</text>
                </div>
                <div className="comment-text">{comment.comment}</div>
                <br />
              </div>
            ))}
          </div>
          <form className="comment-field"onSubmit={this.onEnterKeypress}>
            <div>
              <textarea className="enterComment"
                onChange={this.commentChange}
                type="text"
                value={this.state.commentInput}>
              </textarea>
              <input
                className="submitCommentBtn"
                type="button"
                onClick={this.onSubmit}
                value="Submit Comment"
              />
            </div>
            {message}
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
