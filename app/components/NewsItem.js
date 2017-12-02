import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import defaultImage from '../public/assets/defaultImage';
import FavoriteButton from './FavoriteButton';
import CommentPage from './CommentPage';

class NewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: this.props.article,
      user: this.props.user,
      isOpen: false,
      comments: [],
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  // gets all the comments from database
  componentDidMount() {
    const { article } = this.state;
    axios.post('/comments', article).then((returnedComments) => {
      this.setState({ comments: returnedComments.data });
    });
  }

  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div className="newsItem">
        {this.state.article.urlToImage ? (
          <a href={this.state.article.url} target="_blank">
            <img src={this.state.article.urlToImage} className="articleImg" alt="#" />
          </a>
        ) : (
          <a href={this.state.article.url} target="_blank">
            <img src={defaultImage} className="defaultImg" alt="#" />
          </a>
        )}
        <FavoriteButton liked={this.props.liked} article={this.state.article} />
        {this.state.article.title ? (
          <a href={this.state.article.url} target="_blank">
            <h3 className="articleTitle"> {this.state.article.title} </h3>
          </a>
        ) : null}

        {this.state.article.description ? (
          <p className="articleDescription">{this.state.article.description}</p>
        ) : null}

        {this.state.article.source.name ? (
          <div className="articleSource">
            {this.state.article.source.name}{' '}
            {this.state.article.author ? (
              <p className="articleAuthor">| {this.state.article.author}</p>
            ) : null}
          </div>
        ) : null}

        
        <a href="#">
          <div className="commentBtn">
            <text onClick={this.toggleModal}>{this.state.comments.length}    Comments</text>
          </div>
        </a>

        <CommentPage
          show={this.state.isOpen}
          comments={this.state.comments}
          article={this.state.article}
          user={this.state.user}
          onClose={this.toggleModal}
        />
        <br />
      </div>
    );
  }
}

NewsItem.propTypes = {
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
  liked: PropTypes.bool.isRequired,
};

export default NewsItem;

