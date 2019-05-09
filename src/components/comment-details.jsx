import React from 'react';
import Comment from './comment';
import '../css/comment-details.css';

const CommentDetails = (props) => {
  return (
    <div className="comment-details">
      {props.comments.map(comment => {
        return (
          <Comment comment={comment} key={comment._id} />
        );
      })}
    </div>
  );
};

export default CommentDetails;
