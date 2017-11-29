import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CommentPage from './CommentPage';

const Comment = () => (
  <div className="commentButton">
    <input type="button" value="Post A comment" />
  </div>
);

export default Comment;
