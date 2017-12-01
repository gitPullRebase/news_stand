import React from 'react';
import PropsTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

import Topics from '../components/Topics.js';
import AddSource from '../components/AddSource.js';
import SelectedSources from '../components/SelectedSources.js';
import NewsList from '../components/NewsList.js';
import Header from '../components/Header.js';

import getSources from '../components/helpers/getSources.js';
import {
  isLoggedIn,
  changeArticles,
  toggleClick,
  changeSource,
  changeTopics,
} from '../actions/homeActions.js';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.onRefreshClick = this.onRefreshClick.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onAddSource = this.onAddSource.bind(this);
    this.onRemoval = this.onRemoval.bind(this);
    this.onTopicSearch = this.onTopicSearch.bind(this);
    this.setPreferences = this.setPreferences.bind(this);
  }

  componentDidMount() {
    const { topics, selectedSources, sortBy } = this.props;
    const options = {
      topics,
      selectedSources,
      sortBy,
    };
    this.props.getPreferences(options, (articlesAndPreferences) => {
      console.log(articlesAndPreferences);
      if (articlesAndPreferences.data.preferences) {
        // if user is logged in
        this.props.isLoggedIn(
          articlesAndPreferences.data.preferences.topics,
          articlesAndPreferences.data.preferences.selectedSources,
        );
      }
      console.log('we here');
      this.props.changeArticles(articlesAndPreferences.data.articles);
    });
  }

  onRefreshClick() {
    const { topics, selectedSources, sortBy } = this.props;
    const options = {
      topics,
      selectedSources,
      sortBy,
    };
    this.getArticles(options);
  }

  onToggleClick() {
    this.props.toggleClick();

    const { topics, selectedSources, sortBy } = this.props;
    const options = {
      topics,
      selectedSources,
      sortBy,
    };
    this.getArticles(options);
  }

  onAddSource(source) {
    const sources = this.props.selectedSources;
    sources.push(source);
    this.props.changeSource(sources);

    const { topics, sortBy } = this.props;
    const options = {
      topics,
      selectedSources: sources,
      sortBy,
    };
    this.getArticles(options);
  }

  onRemoval(index, type) {
    const { topics, selectedSources, sortBy } = this.props;

    if (type === 'topics') {
      topics.splice(index, 1);
      this.props.changeTopics(topics);
    } else {
      selectedSources.splice(index, 1);
      this.props.changeSource(selectedSources);
    }

    const options = {
      topics,
      selectedSources,
      sortBy,
    };

    this.getArticles(options);
  }

  onTopicSearch(topic) {
    const { topics, selectedSources, sortBy } = this.props;
    topics.push(topic);
    this.props.changeTopics(topics);

    const options = {
      topics,
      selectedSources,
      sortBy,
    };
    this.getArticles(options);
  }

  setPreferences() {
    const { topics, selectedSources } = this.props;

    axios
      .post('/preferences', { topics, selectedSources })
      .then((message) => {
        console.log(message);
      })
      .catch(() => {
        console.log('There was an error saving user preferences');
      });
  }

  getArticles(options) {
    this.props.search(options, (newsArticles) => {
      this.props.changeArticles(newsArticles);
    });
  }

  render() {
    return (
      <div>
        <div className="headerContainer">
          <Header
            onRefreshClick={this.onRefreshClick}
            onToggleClick={this.onToggleClick}
            sortBy={this.props.sortBy}
          />
        </div>
        <div className="contentContainer">
          <div className="topicsAndSourcesContainer">
            <button id="savePreferences" className="btn btn-primary" onClick={this.setPreferences}>
              Save Preferences
            </button>
            <Topics
              className="topics"
              topics={this.props.topics}
              onTopicSearch={this.onTopicSearch}
              onRemoval={this.onRemoval}
            />

            <AddSource onAddSource={this.onAddSource} getSources={getSources} />
            <SelectedSources
              selectedSources={this.props.selectedSources}
              onRemoval={this.onRemoval}
            />
          </div>

          <div className="articlesContainer">
            <NewsList newsArticles={this.props.articles} />
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  search: PropsTypes.func.isRequired,
  getPreferences: PropsTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sortBy: state.home.sortBy,
  articles: state.home.articles,
  selectedSources: state.home.selectedSources,
  topics: state.home.topics,
});

const mapDispatchToProps = dispatch => ({
  isLoggedIn: (topics, selectedSources) => {
    dispatch(isLoggedIn(topics, selectedSources));
  },
  changeArticles: (articles) => {
    dispatch(changeArticles(articles));
  },
  toggleClick: () => {
    dispatch(toggleClick());
  },
  changeSource: (selectedSources) => {
    dispatch(changeSource(selectedSources));
  },
  changeTopics: (topics) => {
    dispatch(changeTopics(topics));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
