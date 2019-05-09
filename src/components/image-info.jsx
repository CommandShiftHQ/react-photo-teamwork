import React from 'react';
import ProfileName from './profile-name';
import CommentDetails from './comment-details';
import ImageData from './image-data';
import CommentForm from './comment-form';
import '../css/image-info.css';

const ImageInfo = (props) => {
  console.log(props);
  return (
    <div className="image-info">
      <ProfileName user={props.user} />
      <CommentDetails comments={props.comments} />
      <ImageData imageLike={props.imageLike} />
      <CommentForm handleAddComment={props.handleAddComment} />
    </div>
  );
};

export default ImageInfo;
