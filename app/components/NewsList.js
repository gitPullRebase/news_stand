import React from 'react';
import PropTypes from 'prop-types';
import uniq from 'node-uniq';

import NewsItem from './NewsItem';
import Spinner from './Spinner';

const NewsList = props => (
  <div className="news-list">
    {props.newsArticles.length === 0 ? (
      <Spinner />
    ) : (
      props.newsArticles &&
      uniq(props.newsArticles, i => i.url).map(article => (
        <NewsItem user={props.user} article={article} key={article.url} liked={props.liked} />
      ))
    )}
  </div>
);

NewsList.propTypes = {
  newsArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.string,
  liked: PropTypes.bool.isRequired,
};

export default NewsList;
