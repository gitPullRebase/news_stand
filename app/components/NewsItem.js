import React from 'react';
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
    };
    this.toggleModal = this.toggleModal.bind(this);
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

        <div className="commentBtn">
          <input onClick={this.toggleModal} type="button" value="Comments" />
        </div>

        <CommentPage
          show={this.state.isOpen}
          article={this.state.article}
          user={this.state.user}
          onClose={this.toggleModal}
        />
        <br />
      </div>
    );
  }
}

// const NewsItem = ({ article, handleCommentBtnClick }) => (
//   <div className="newsItem">
//     {article.urlToImage ? (
//       <a href={article.url} target="_blank">
//         <img src={article.urlToImage} className="articleImg" alt="#" />
//       </a>
//     ) : (
//       <a href={article.url} target="_blank">
//         <img src={defaultImage} className="defaultImg" alt="#" />
//       </a>
//     )}
//     <FavoriteButton article={article} />
//     {article.title ? (
//       <a href={article.url} target="_blank">
//         <h3 className="articleTitle"> {article.title} </h3>
//       </a>
//     ) : null}

//     {article.description ? <p className="articleDescription">{article.description}</p> : null}

//     {article.source.name ? (
//       <div className="articleSource">
//         {article.source.name}{' '}
//         {article.author ? <p className="articleAuthor">| {article.author}</p> : null}
//       </div>
//     ) : null}

//     <CommentButton handleCommentBtnClick={handleCommentBtnClick} article={article} />

//     <br />
//   </div>
// );

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
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string),
    selectedSources: PropTypes.arrayOf(PropTypes.object),
    profileImg: PropTypes.string,
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default NewsItem;
