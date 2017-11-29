import React from 'react';
import axios from 'axios';

class CommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 'input',
      comments: [],
    };
  }

  componentDidMount() {
    axios.get('/getComments', (req, res) => {}).then((comments) => {
      this.setState({ comments });
    }).then( () => {
      res.send();
    });
  }

  commentChange(event) {
    this.setState({ input: event.target.value });
  }

  render() {
    return <div />;
  }
}

export default CommentPage;
