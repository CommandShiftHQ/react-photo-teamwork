import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../css/image-browser.css';

library.add(faComment, faHeart);

const ImageBrowser = (props) => {
  return (
    <div className="image-grid">
      {props.images.map(image => {
        return (
          <Link
            to={`/image/${image._id}`}
            key={image._id}
          >
            <div className="thumbnail-image">
              <div className="image-frame">
                <img src={image.thumb} />
              </div>
              <div className="thumbnail-stats">
                <span>
                  <FontAwesomeIcon icon="comment" className="icon" />
                  {image.comments.length}
                </span>
                <span>
                  <FontAwesomeIcon icon="heart" className="icon" />
                  {image.likes}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ImageBrowser;
