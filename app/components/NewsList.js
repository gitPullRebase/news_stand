import React from 'react';
import PropTypes from 'prop-types';
import uniq from 'node-uniq';

import NewsItem from './NewsItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner.js';

class NewsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allArticles: [],
      shownArticles: [],
      items: 0,
    };
    this.refresh = this.refresh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ allArticles: nextProps.newsArticles });
    this.setState({ shownArticles: nextProps.newsArticles.slice(0, 4) });
    this.setState({ items: 4 });
  }

  refresh() {
    // Retrieve 4 items at a time and render
    this.setState({ items: this.state.items + 4 });
    this.setState({ shownArticles: this.state.allArticles.slice(0, this.state.items) });
  }

  render() {
    return (
      <div className="news-list">
        <InfiniteScroll next={this.refresh} hasMore endMessage={<h3>The End</h3>}>
          {this.state.shownArticles.length === 0 ? (
            <Spinner />
          ) : (
            this.state.shownArticles &&
            uniq(this.state.shownArticles, i => i.url).map(article => (
              <NewsItem
                user={this.props.user}
                article={article}
                key={article.url}
                liked={this.props.liked}
              />
            ))
          )}
        </InfiniteScroll>
      </div>
    );
  }
}

NewsList.propTypes = {
  newsArticles: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.string,
  liked: PropTypes.bool.isRequired,
};

export default NewsList;
