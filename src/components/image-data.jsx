import React from 'react';
import '../css/image-data.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ImageData = (props) => {
  return (
    <div className="image-data">
      <div className="icon"><FontAwesomeIcon icon="heart" /></div>
      <div className="image-like">{props.imageLike} likes</div>
    </div>
  );
};

export default ImageData;
