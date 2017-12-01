import React from 'react';
import { Link } from 'react-router-dom';

class CommentButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.props.article,
    };
  }

  onClickHandler() {
    props.handleCommentBtnClick(this.state.article);
  }

  render() {
    return (
      <Link to="/comments">
        <a href="#">
          <div className="commentButton">
            <input onClick={this.onClickHandler} type="button" value="Post A comment" />
          </div>
        </a>
      </Link>
    );
  }
}

CommentButton.propTypes = {
  handleCommentBtnClick: PropTypes.func.isRequired,
};

export default CommentButton;
