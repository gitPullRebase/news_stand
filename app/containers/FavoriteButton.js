import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Heart from 'mui-icons/cmdi/heart';
import axios from 'axios';
import { connect } from 'react-redux';

import { addFavorite } from '../actions/favoriteActions.js';

class FavoriteButton extends React.Component {
  constructor(props) {
    super(props);
    this.onAddFavorite = this.onAddFavorite.bind(this);
  }

  onAddFavorite(article) {
    axios
      .post('/favorites', article)
      .then((response) => {
        if (response.data === 'favorite added') {
          this.setState({
            favorited: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <IconButton className="favbtn" onClick={() => this.props.addFavorite(this.props.article)}>
          <Heart className={this.props.favorited ? 'favorited' : 'favorite'} />
        </IconButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorited: state.favorite.favorited,
});

const mapDispatchToProps = dispatch => ({
  addFavorite: (article) => {
    dispatch(addFavorite(article));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);

FavoriteButton.propTypes = {
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
};
