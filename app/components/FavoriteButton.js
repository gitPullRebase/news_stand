import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Heart from 'mui-icons/cmdi/heart';
import axios from 'axios';
import Dislike from 'material-ui-icons/HighlightOff'
import { confirmAlert } from 'react-confirm-alert';

class FavoriteButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favorited: false,
      disliked: false,
      confirm: false,
    };
    this.onAddFavorite = this.onAddFavorite.bind(this);
    this.onDislike = this.onDislike.bind(this);
  }
  onAddFavorite(article) {
    axios.post('/favorites', article)
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
  onConfirm(article){ 
    confirmAlert({
      title: 'Confirm to submit',                        // Title dialog
      message: 'Are you sure to remove this article?',               // Message dialog
      // childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
      confirmLabel: 'Confirm',                           // Text button confirm
      cancelLabel: 'Cancel',                             // Text button cancel
      onConfirm: () => this.onDislike(article),    // Action after Confirm
      // onCancel: () => alert('Action after Cancel'),      // Action after Cancel
    })
  }
  onDislike(article){ 
    
    this.setState({confirm: true})
    axios.post('/dislikes', article)
      .then((response)=>{ 
        console.log("response--->", response)
        if(response.data === 'article removed') { 
          console.log("disliked!")
          this.setState({
            disliked: true,
          });
        }
        console.log("state: ", this.state.disliked)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render() {
    return (
      <div>
        <IconButton className="favbtn" onClick={() => this.onAddFavorite(this.props.article)}>
          <Heart className={this.state.favorited ? 'favorited' : 'favorite'} />
        </IconButton>
        {this.props.liked ?
        
          <IconButton className='disbtn' onClick={() => {this.onConfirm(this.props.article)}}>
            <Dislike className={this.state.disliked ? 'disliked' : 'dislike' }/>
          </IconButton>  : 
          null
        }

      </div>
    );
  }
}

export default FavoriteButton;

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
