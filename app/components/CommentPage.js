import React from 'react';
import axios from 'axios';
import PropsTypes from 'prop-types';

class CommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: 'input',
      comments: [],
    };
  }

  // gets all the comments from database
  componentDidMount() {
    axios({
      method: 'post',
      url: '/comments',
      data: { url: this.props.article.url },
    }).then((returnedComments) => {
      this.setState({ comments: returnedComments });
    });
  }

  onSubmit() {
    axios({
      method: 'post',
      url: '/saveComment',
      data: { comment: this.state.commentInput, url: this.props.article.url, author: , },
    }).then(() => {});
  }

  commentChange(event) {
    this.setState({ commentInput: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="enterComment">
          <input type="text" />
        </div>
        <div className="submitCommentBtn">
          <input type="button" onClick={this.onSubmit} value="Submit Comment" />
        </div>
      </div>
    );
  }
}

CommentPage.propTypes = {
  article: PropsTypes.string.isRequired,
};

export default CommentPage;
