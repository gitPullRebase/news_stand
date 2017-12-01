import React from 'react';
import PropTypes from 'prop-types';
import uniq from 'node-uniq';

import NewsItem from './NewsItem';

const NewsList = props => (
  <div className="news-list">
    {props.newsArticles.length === 0 ? (
      <div id="no-articles">No articles found. Please try another search</div>
    ) : (
      props.newsArticles &&
      uniq(props.newsArticles, i => i.url).map(article => (
        <NewsItem
          user={props.user}
          handleCommentBtnClick={props.handleCommentBtnClick}
          article={article}
          key={article.url}
        />
      ))
    )}
  </div>
);

NewsList.propTypes = {
  newsArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCommentBtnClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string),
    selectedSources: PropTypes.arrayOf(PropTypes.object),
    profileImg: PropTypes.string,
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default NewsList;
