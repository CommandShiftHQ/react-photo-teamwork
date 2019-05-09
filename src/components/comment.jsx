import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/comment.css';

const Comment = (props) => {
  return (
    <div className="comment">
      <div className="comment-div">
        <div className="content">Comment: {props.comment.content}</div>
        <div className="icon"><FontAwesomeIcon icon="heart" /></div>
      </div>
      <div className="comment-data">
        <div className="comment-likes">{props.comment.likes} likes</div>
        <div>Reply</div>
      </div>
    </div>
  );
};

export default Comment;
